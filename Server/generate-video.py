import cv2
import sys
import os

def create_slideshow(image_paths, output_path, duration_per_image=2, fps=1):
    """
    Create a slowed-down video slideshow from images.

    Parameters:
        image_paths (list): List of image file paths.
        output_path (str): Path to save the output video.
        duration_per_image (int): Duration each image appears in seconds.
        fps (int): Frames per second for the video.
    """
    images = [cv2.imread(img) for img in image_paths]
    if not images or any(img is None for img in images):
        raise ValueError("One or more images could not be loaded.")

    height, width, layers = images[0].shape

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    frames_per_image = duration_per_image * fps 
    for image in images:
        for _ in range(frames_per_image):
            video.write(image)

    video.release()
    print(f"Slideshow video saved to {output_path}")

if __name__ == "__main__":
    image_paths = sys.argv[1].split(',')
    output_path = sys.argv[2]

    create_slideshow(image_paths, output_path, duration_per_image=3, fps=1)
