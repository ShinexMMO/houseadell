// Keep the approved final frame moving without a video seek or a loop boundary.
export function createSwirlRenderer(canvas, video) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw new Error("Swirl shader could not compile");
    }
    return shader;
  };
  let program;
  let vertex;
  let fragment;
  try {
    vertex = compile(
      gl.VERTEX_SHADER,
      `
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * .5 + .5;
        gl_Position = vec4(position, 0., 1.);
      }
    `,
    );
    fragment = compile(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      uniform sampler2D picture;
      uniform float time;
      uniform vec4 crop;
      varying vec2 uv;
      void main() {
        vec2 p = uv * crop.xy + crop.zw;
        // At t=0 the image is identical to the final video frame.
        // A small residual push settles into continuous, slow liquid motion.
        float push = 1. + .018 * (1. - exp(-time / 2.5));
        p = (p - vec2(.5)) / push + vec2(.5);
        float edge = sin(p.x * 3.14159265) * sin(p.y * 3.14159265);
        vec2 flow = .016 * vec2(
          sin(p.y * 6.3 + time * .17) - sin(p.y * 6.3),
          cos(p.x * 5.7 - time * .13) - cos(p.x * 5.7)
        );
        flow += .008 * vec2(
          sin(p.x * 8.1 + p.y * 3.4 - time * .113) - sin(p.x * 8.1 + p.y * 3.4),
          sin(p.y * 7.4 - p.x * 4.2 + time * .151) - sin(p.y * 7.4 - p.x * 4.2)
        );
        gl_FragColor = texture2D(picture, p + flow * edge);
      }
    `,
    );
    program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error("Swirl link failed");
  } catch {
    if (program) gl.deleteProgram(program);
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const timeLocation = gl.getUniformLocation(program, "time");
  const cropLocation = gl.getUniformLocation(program, "crop");
  gl.uniform1i(gl.getUniformLocation(program, "picture"), 0);

  let active = false;
  let running = false;
  let request = 0;
  let previous = 0;
  let elapsed = 0;
  let disposed = false;
  const stats = { frames: 0, seconds: 0, maxGap: 0, running: false };
  if (import.meta.env.DEV) canvas.swirlStats = stats;

  const draw = () => {
    gl.uniform1f(timeLocation, elapsed);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    stats.frames++;
    stats.seconds = elapsed;
  };
  const resize = () => {
    if (disposed) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const imageWidth = video.videoWidth || 1280;
    const imageHeight = video.videoHeight || 720;
    const scale = Math.max(width / imageWidth, height / imageHeight);
    const cropX = width / (imageWidth * scale);
    const cropY = height / (imageHeight * scale);
    const horizontal = parseFloat(getComputedStyle(video).objectPosition) / 100;
    gl.uniform4f(
      cropLocation,
      cropX,
      cropY,
      (1 - cropX) * horizontal,
      (1 - cropY) * 0.5,
    );
    if (active) draw();
  };
  const tick = (now) => {
    if (!running || disposed || document.hidden) return;
    if (previous) {
      stats.maxGap = Math.max(stats.maxGap, now - previous);
      // Resume from the same visual phase after a throttled/background tab.
      elapsed += Math.min((now - previous) / 1000, 0.05);
    }
    previous = now;
    draw();
    request = requestAnimationFrame(tick);
  };
  const schedule = () => {
    cancelAnimationFrame(request);
    previous = 0;
    if (running && !document.hidden) request = requestAnimationFrame(tick);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  document.addEventListener("visibilitychange", schedule);
  resize();

  return {
    start() {
      if (disposed || !video.videoWidth) return false;
      try {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          video,
        );
      } catch {
        return false;
      }
      active = true;
      running = true;
      stats.running = true;
      draw();
      schedule();
      return true;
    },
    pause() {
      running = false;
      stats.running = false;
      cancelAnimationFrame(request);
      previous = 0;
    },
    resume() {
      if (!active || disposed) return;
      running = true;
      stats.running = true;
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(request);
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      delete canvas.swirlStats;
    },
  };
}
