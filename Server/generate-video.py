import cv2
import sys
import os

def create_slideshow(image_paths, output_path, duration_per_image=2, fps=1, target_size=(1920, 1080)):
    """
    Create a slowed-down video slideshow from images with optional resizing.

    Parameters:
        image_paths (list): List of image file paths.
        output_path (str): Path to save the output video.
        duration_per_image (int): Duration each image appears in seconds.
        fps (int): Frames per second for the video.
        target_size (tuple): Desired (width, height) for resizing images.
    """
    images = [cv2.imread(img) for img in image_paths]
    if not images or any(img is None for img in images):
        raise ValueError("One or more images could not be loaded.")

    # Resize images to target size
    resized_images = [cv2.resize(img, target_size, interpolation=cv2.INTER_LINEAR) for img in images]

    width, height = target_size

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    frames_per_image = duration_per_image * fps 
    for image in resized_images:
        for _ in range(frames_per_image):
            video.write(image)

    video.release()
    print(f"Slideshow video saved to {output_path}")

if __name__ == "__main__":
    image_paths = sys.argv[1].split(',')
    output_path = sys.argv[2]

    # Default target size is 1920x1080. You can modify it as needed.
    create_slideshow(image_paths, output_path, duration_per_image=3, fps=1, target_size=(1280, 720))
