import os
import shutil
from PIL import Image

def convert_images():
    source_dir = os.path.join("public", "gallery images")
    dest_dir = os.path.join("public", "Gallery-pic")

    # Ensure source directory exists
    if not os.path.exists(source_dir):
        print(f"Source directory not found: {source_dir}")
        return

    # Create destination directory if it doesn't exist
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    # Clean destination directory
    print("Cleaning destination directory...")
    for filename in os.listdir(dest_dir):
        file_path = os.path.join(dest_dir, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}. Reason: {e}")

    # Get list of files in source directory
    files = [f for f in os.listdir(source_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    files.sort() # Sort to ensure consistent ordering

    print(f"Found {len(files)} images to convert.")

    for i, filename in enumerate(files):
        source_path = os.path.join(source_dir, filename)
        new_filename = f"project-{i+1}.webp"
        dest_path = os.path.join(dest_dir, new_filename)

        print(f"Converting {filename} to {new_filename}...")
        
        try:
            with Image.open(source_path) as img:
                img.save(dest_path, "WEBP", quality=85)
        except Exception as e:
            print(f"Error converting {filename}: {e}")

    print("Conversion complete.")

if __name__ == "__main__":
    try:
        convert_images()
    except ImportError:
        print("Pillow is not installed. Installing Pillow...")
        os.system("pip install Pillow")
        convert_images()
