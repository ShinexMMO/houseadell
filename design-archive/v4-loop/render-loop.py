"""Create a slow, cyclic macro-only continuation from the approved hero film.
Run from the website directory using the media Python environment.
"""
from pathlib import Path
import subprocess
import imageio_ffmpeg

ff = imageio_ffmpeg.get_ffmpeg_exe()
filters = (
    '[0:v]trim=start=10.75:end=14,setpts=4*(PTS-STARTPTS),'
    'minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,'
    'tpad=stop_mode=clone:stop_duration=0.5,trim=duration=13,split=2[a][b];'
    '[a][b]xfade=transition=fade:duration=4:offset=9,'
    'trim=start=4:end=13,setpts=N/(24*TB),format=yuv420p[v]'
)
subprocess.run([
    ff, '-hide_banner', '-loglevel', 'error', '-i', 'public/assets/latte-pour.mp4',
    '-filter_complex', filters, '-map', '[v]', '-an', '-c:v', 'libx264',
    '-crf', '19', '-preset', 'medium', '-r', '24', '-fps_mode', 'cfr',
    '-video_track_timescale', '12288', '-movflags', '+faststart', '-y',
    'design-archive/v4-loop/latte-swirls-loop-smooth.mp4'
], check=True)
print('Smooth loop:', Path('design-archive/v4-loop/latte-swirls-loop-smooth.mp4').stat().st_size, 'bytes')
