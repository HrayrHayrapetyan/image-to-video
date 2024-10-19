let fileInput=document.getElementById('file-input')
let imageContainer=document.getElementById('images')
let numOfFiles=document.getElementById('num-of-files')  

function preview(){
    imageContainer.innerHTML=''
    numOfFiles.textContent=`${fileInput.files.length} Files Selected`;
    
    for (i of fileInput.files){
        let reader=new FileReader()
        let figure=document.createElement('figure')
        let figCap=document.createElement('figcaption')
        figCap.innerText=i.name
        figure.appendChild(figCap)
        reader.Onload=()=>{
            let img=document.createElement('img')
            img.setAtribute('src',reader.result)
            figure.insertBefore(img,figCap)
        }
        imageContainer.appendChild(figure)
        reader.readAsDaraURL(i)
        
    }
