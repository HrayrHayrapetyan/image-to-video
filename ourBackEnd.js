const { v4: uuidv4 } = require('uuid');
const express = require('express')
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')
const { log } = require('console')
const cors = require('cors')
const ffmpegPath = require('ffmpeg-static')

console.log(ffmpegPath);
ffmpeg.setFfmpegPath(ffmpegPath)

const app = express()
const port = 5000

const scaleOptions=[
    "scale=1280:720",
    "scale=640:320",
    "scale=1920:1080",
    "scale=854:480"
]

app.use(cors())

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        console.log('Uploading to: ', uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null,  uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({ storage });

app.post('/upload-images', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No images uploaded')
    }

    console.log(req.files);
    const imagePaths = req.files.map(file => path.join(__dirname, 'uploads', file.filename))
    const videoPath = path.join(__dirname, 'uploads', 'output.mp4')

    // fs.writeFile(videoPath, ' ', (err) => {
    //     if (err) {
    //         console.error('Error creating output.mp4:', err);
    //     } else {
    //         console.log('Placeholder output.mp4 created successfully.');
    //     }
    // })

    console.log('imagepaths', imagePaths);
    console.log('VideoPath', videoPath)

    let ffmpegCommand = ffmpeg()

    // Add images as input files
    imagePaths.forEach(imagePath => {
        console.log('Adding image',imagePath);
        ffmpegCommand.input(imagePath)
    })

    // Set the frame rate and duration for each image
    ffmpegCommand
        .inputOptions('-framerate 1')  // One frame per second (adjust as needed)
        .output(videoPath)
        .videoFilters(scaleOptions) // Set resolution to 1280x720 (you can adjust it)
        .videoCodec('libx264')
        .outputOptions('-pix_fmt yuv420p')
        .on('stderr', (stderrLine) => {
            console.log('FFmpeg STDERR:', stderrLine);
        })
        .on('end', () => {
            console.log('Video conversion complete');

            res.json({
                videoUrl: `http://localhost:${port}/uploads/output.mp4`
            });

            imagePaths.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                } else {
                    console.warn(`File not found, skipping: ${file}`);
                }
            });
        })
        .on('error', (err) => {
            console.error('Error during conversion', err);
            res.status(500).send('Error converting images to video');
        })
        .run();
})

app.use('/uploads', express.static('uploads'))
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
