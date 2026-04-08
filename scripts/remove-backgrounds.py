"""
Batch background removal for game images using rembg (U2-Net)
Converts JPG with backgrounds -> PNG with transparency
Output goes to static/images/zh-transparent/
"""
import os
from pathlib import Path
from rembg import remove
from PIL import Image

STATIC_DIR = Path(__file__).parent.parent / "static" / "images" / "zh"
OUT_DIR = Path(__file__).parent.parent / "static" / "images" / "zh-transparent"

def process_folder(sub: str):
    folder = STATIC_DIR / sub
    out_folder = OUT_DIR / sub
    if not folder.exists():
        return
    out_folder.mkdir(parents=True, exist_ok=True)
    for f in sorted(folder.glob("*.jpg")):
        out = out_folder / f.with_suffix(".png").name
        if out.exists():
            print(f"  skip {f.name} (already done)")
            continue
        print(f"  {f.name} ...", end=" ", flush=True)
        img = Image.open(f)
        result = remove(img)
        result.save(out)
        print("done ->", out.name)

print("=== Removing backgrounds ===")

for sub in ["animals", "objects", "numbers", "colours", "bugs"]:
    folder = STATIC_DIR / sub
    if folder.exists():
        print(f"\n--- {sub} ---")
        process_folder(sub)

print("\nAll done! Transparent PNGs in static/images/zh-transparent/")
