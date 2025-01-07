import React, {  useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


function VideoMaker() {
    const [previews,setPreviews]=useState([])
    const [ready,setReady]=useState(false)
    const [videoUrl,setVideoUrl]=useState()
    const [loading,setLoading]=useState(false)

    const convertToVideo= async (e)=>{
        e.preventDefault()

        if(previews.length==0){
          alert('Please select some images')
          return
        }

        setLoading(true)

        const formdata=new FormData()

        for(let i=0;i<previews.length;i++){
          formdata.append('images',previews[i])
        }
                
        try{
          const response=await axios.post('http://localhost:5001/upload-images',formdata,{
            headers:{
              'Content-Type':'multipart/form-data',
            },
            responseType: 'blob',        
          })

          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
          const videoUrl = URL.createObjectURL(videoBlob);

          setVideoUrl(videoUrl);

          console.log('Response from backend',response);

          setVideoUrl(response.data.videoUrl)
        }
        catch(error){
          console.error('Error uploading the images',error)
        }
      }

    function handleFileChange(e){
      setPreviews([...e.target.files])
    }

return (
    <div>
        <h1>Miniapp</h1>
        <p>Please Upload Your Images</p>
        <input type="file" accept="image/*" multiple className="upload-button" onChange={handleFileChange} />
        <div className="previews" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {previews.map((image) => (
                    <img
                        src={URL.createObjectURL(image)}
                        key={uuidv4()}
                        alt="preview"
                        style={{
                            width: "150px",
                            height: "150px",
                            margin: "10px",
                            objectFit: "cover",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    />
                ))}
            </div>

        <button onClick={convertToVideo} disabled={loading}>
            {loading ? 'Creating Video...' : 'Create Video'}
        </button>        
        {videoUrl && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Your Video:</h2>
                    <video
                        controls
                        style={{
                            width: "80%",
                            maxWidth: "600px",
                            margin: "auto",
                            display: "block",
                        }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                </div>
        )
        }
    </div>
    
)
}


 
export default VideoMaker;

