# Image to Video: Create  Slideshows from Your Photos

**Image to Video** is a simple and intuitive application that lets users upload photos and transform them into beautiful slideshow videos. Whether you want to preserve memories or create a presentation, this tool has you covered.

---

## Features

- 📸 **Photo Upload**: Upload multiple images at once.  
- 🎥 **Slideshow Maker**: Combine your photos into a seamless video.    
- 💾 **Download Videos**: Export your slideshow as a video file.

---

## How to Use

1. **Upload Photos**: click to select the photos from your device.  
2. **Generate Video**: Click the "Generate Video" button to render your video.  
3. **Download & Share**: Save the video to your device or share it directly on social media.

---

## Installation (For Developers)

To run this project locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher recommended)  
- **npm** (comes with Node.js)  

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/image-to-video.git
cd image-to-video
```

---

### 2. Install Dependencies

#### Backend (Server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```

#### Frontend (Client)
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```

---

### 3. Running the Application

#### Start the Backend (Server)
1. Go to the `server` directory if you’re not already there:
   ```bash
   cd ../server
   ```
2. Start the backend server:
   ```bash
   npm start
   ```
3. The backend will run on `http://localhost:5000` (or the port specified in your configuration).

#### Start the Frontend (Client)
1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Start the frontend development server:
   ```bash
   npm start
   ```
3. The frontend will run on `http://localhost:5173` by default.

---

### 4. Access the Application

Once both servers are running:
- Open your browser and go to `http://localhost:5173` to access the application.

---

### 5. Notes

- Ensure that the backend is running before starting the frontend, as the frontend will communicate with the backend API.  

--- 


## Built With

- **Frontend**: JavaScript, React  
- **Backend**: Node.js, Express  
- **Video Processing**: Python,OpenCV  

---

