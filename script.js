let fileInput=document.getElementById('file-input')
let imageContainer=document.getElementById('images')
let numOfFiles=document.getElementById('num-of-files')

function preview(){
    imageContainer.innerHTML=''
    numOfFiles.textContent=`${fileInput.files.length}Files Selected`;
    


}
