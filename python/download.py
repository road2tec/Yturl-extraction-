from yt_dlp import YoutubeDL
import sys
import os

def download_video(url: str, output_path: str):
    ydl_opts = {
        'outtmpl': output_path,
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'merge_output_format': 'mp4',
    }
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    url = sys.argv[1]
    output_path = sys.argv[2]
    download_video(url, output_path)