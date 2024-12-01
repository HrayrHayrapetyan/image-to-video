import React, {  useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


function App() {
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
          const response=await axios.post('http://localhost:5000/upload-images',formdata,{
            headers:{
              'Content-Type':'multipart/form-data',
            }
          })

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
        <div className="previews">{previews.map((image)=>{
            return <img src={URL.createObjectURL(image)} key={uuidv4()}/>
        })}
        </div>

        <button onClick={convertToVideo} disabled={loading}>
            {loading ? 'Creating Video...' : 'Create Video'}
        </button>        
            {videoUrl && (
                <video >
                    <source src={videoUrl} type="video/mp4"/>
                </video>
        )
        }
    </div>
    
)
}


 
export default App;
