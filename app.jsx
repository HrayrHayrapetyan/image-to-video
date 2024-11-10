import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg=createFFmpeg({log:true})

 
function App() {
    const [files, setFiles] = useState([]);
    const [ready,setReady]=useState(false)
    const [Video,setVideo]=useState()

    const load=async ()=>{
      await ffmpeg.load()
      setReady(true)
    }

    useEffect(()=>{
      load()
    },[])

    const convertToVideo=()=>{
      
    }


    function handleChange(e) {
        const newFiles=Array.from(e.target.files)
        const imageUrls=newFiles.map(file=>URL.createObjectURL(file))
        setFiles(imageUrls)
    }

    return (
        <div className="App">
          <h1>Miniapp</h1>
            <h2>Add Your Images:</h2>
            <input type="file" className='upload-button' multiple onChange={handleChange} />
            <div className='image-gallery'>
              {files.map((file,index)=>(
            <img
              key={index}
              src={file}
              alt={`Preview ${index}`}
              className='uploadad-image'/>
            ))}
            <button type="button" >Generate A Video</button>
            {Video && <video src={Video}></video>}
            </div>
        </div>
    );
    
}
 
