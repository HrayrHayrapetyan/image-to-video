import React, { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function App() {
    const [files, setFiles] = useState([]);        // State to store image URLs for previews
    const [ready, setReady] = useState(false);     // State to track if ffmpeg is loaded
    const [Video, setVideo] = useState(null);      // State to store the generated video URL
    const ffmpeg = createFFmpeg({ log: true });    // Initialize ffmpeg with logging enabled

    // Load ffmpeg when the component mounts
    useEffect(() => {
        const loadFFmpeg = async () => {
            if (!ffmpeg.isLoaded()) {
                await ffmpeg.load();
                setReady(true); // Set ready to true after ffmpeg has loaded
            }
        };
        loadFFmpeg();
    }, []);

    // Function to handle image uploads
    function handleChange(e) {
        const newFiles = Array.from(e.target.files); // Convert FileList to an array
        const imageUrls = newFiles.map(file => URL.createObjectURL(file)); // Generate preview URLs
        setFiles(imageUrls); // Store preview URLs in state for displaying images
    }

    // Function to convert images to a video
    const convertToVideo = async () => {
        if (files.length === 0) {
            alert("Please upload images first.");
            return;
        }

        // Write each uploaded image to ffmpeg's virtual file system
        for (let i = 0; i < files.length; i++) {
            await ffmpeg.FS('writeFile', `image${i}.png`, await fetchFile(files[i]));
        }

        // Run ffmpeg command to create a video from the images
        await ffmpeg.run(
            '-framerate', '1',               // Set the frame rate to 1 fps (adjust if needed)
            '-i', 'image%d.png',             // Specify images in sequence: image0.png, image1.png, etc.
            '-c:v', 'libx264',               // Use H.264 codec
            '-r', '30',                      // Output video frame rate
            '-pix_fmt', 'yuv420p',           // Pixel format for compatibility
            'output.mp4'                     // Output file name in ffmpeg's file system
        );

        // Read the output video from ffmpeg's file system
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const videoURL = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

        // Set the video URL in state to preview and download it
        setVideo(videoURL);
    };

    return (
        <div className="App">
            <h1>Miniapp</h1>
            <h2>Add Your Images:</h2>

            {/* File input for uploading multiple images */}
            <input
                type="file"
                className="upload-button"
                multiple
                accept="image/*"
                onChange={handleChange}
            />

            {/* Display uploaded images as a gallery */}
            <div className="image-gallery">
                {files.map((file, index) => (
                    <img
                        key={index}
                        src={file}
                        alt={`Preview ${index}`}
                        className="uploaded-image"
                    />
                ))}
            </div>

            {/* Button to generate the video */}
            <button
                type="button"
                onClick={convertToVideo}
                disabled={!ready} // Disable if ffmpeg isn't ready yet
            >
                Generate A Video
            </button>

            {/* Display the generated video with controls */}
            {Video && (
                <div>
                    <video controls src={Video} width="600" />
                    <a href={Video} download="output.mp4">Download Video</a>
                </div>
            )}
        </div>
    );
}

export default App;
