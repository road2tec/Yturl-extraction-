import sys
import os
import wave
from moviepy import VideoFileClip
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment


MODEL_PATH = "python/model"

# -------------------------------
# STEP 1: Extract text from video
# -------------------------------
def extract_text_from_video(video_path):
    if not os.path.exists("tmp"):
        os.makedirs("tmp")
    video = VideoFileClip(video_path)
    audio_path = "tmp/temp_audio.wav"
    video.audio.write_audiofile(audio_path,codec="pcm_s16le")
    video.close()
    sound = AudioSegment.from_wav(audio_path)
    sound = sound.set_channels(1).set_frame_rate(16000)
    sound.export(audio_path, format="wav")
    sound = None
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Vosk model not found at {MODEL_PATH}")
    model = Model(MODEL_PATH)
    wf = wave.open(audio_path, "rb")
    if wf.getnchannels() != 1 or wf.getsampwidth() != 2:
        raise ValueError("Audio file must be WAV format mono PCM.")

    rec = KaldiRecognizer(model, wf.getframerate())
    rec.SetWords(True)

    text = []
    print("Transcribing audio...")
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            res = rec.Result()
            text.append(eval(res).get("text", ""))
    res = rec.FinalResult()
    text.append(eval(res).get("text", ""))
    wf.close()
    return " ".join(text).strip()

# -------------------------------
# MAIN EXECUTION
# -------------------------------
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: py -3.12 python/predict.py <video_path>")
        sys.exit(1)

    video_path = sys.argv[1]

    if not os.path.exists(video_path):
        print(f"❌ File not found: {video_path}")
        sys.exit(1)

    extracted_text = extract_text_from_video(video_path)
    with open("tmp/extracted_text.txt", "w", encoding="utf-8") as f:
        f.write(extracted_text)
    os.remove("tmp/temp_audio.wav")
