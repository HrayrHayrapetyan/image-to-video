const { v4: uuidv4 } = require("uuid");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const port = 5001;

app.use(cors());

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    console.log("Uploading to: ", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload-images", upload.array("images", 10), (req, res) => {
  console.log('inside upload images')
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No images uploaded");
  }

  console.log(req.files);
  const imagePaths = req.files.map((file) =>
    path.join(__dirname, "uploads", file.filename)
  );
  const videoPath = path.join(__dirname, "uploads", "output.mp4");

  console.log("imagepaths", imagePaths);
  console.log("VideoPath", videoPath);

  const command = `python3 generate-video.py "${imagePaths
    .map((p) => `"${p}"`)
    .join(",")}" "${videoPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send("Error processing images.");
    }

    console.log(`Python Script Output: ${stdout}`);

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "inline; filename=output.mp4");
    fs.createReadStream(videoPath).pipe(res);
  });
});

app.use("/uploads", express.static("uploads"));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
