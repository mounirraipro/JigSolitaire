from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
LEVELS_DIR = ROOT / 'public' / 'levels'
THUMBS_DIR = ROOT / 'public' / 'level-thumbs'
THUMB_SIZE = (480, 480)
QUALITY = 78


def iter_level_images():
    for category_dir in sorted(path for path in LEVELS_DIR.iterdir() if path.is_dir()):
        for image_path in sorted(category_dir.iterdir()):
            if image_path.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp', '.gif'}:
                yield category_dir.name, image_path


def build_thumbnail(source_path: Path, target_path: Path) -> None:
    target_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as image:
        if image.mode not in ('RGB', 'L'):
            image = image.convert('RGB')

        thumb = ImageOps.contain(image, THUMB_SIZE, Image.Resampling.LANCZOS)
        thumb.save(target_path, format='WEBP', quality=QUALITY, method=6)


def main() -> None:
    generated = 0

    for category_name, image_path in iter_level_images():
        target_path = THUMBS_DIR / category_name / f'{image_path.stem}.webp'
        build_thumbnail(image_path, target_path)
        generated += 1

    print(f'Generated {generated} thumbnails in {THUMBS_DIR}')


if __name__ == '__main__':
    main()
