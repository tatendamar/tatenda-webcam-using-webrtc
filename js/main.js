// Global Vars
let width = 500,
    height = 0,
    filter = "none",
    streaming = false;

// DOM elelments
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');


//Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false}
)
 .then(function(stream){
   //link to the video source
   video.srcObject = stream;
   //play video
   video.play();
 })
 .catch(function(err){
   console.log(`Error: ${err}`);
 });

 //play when ready
 video.addEventListener('canplay', function(e){
   if(!streaming){
     //set video / canvas height
     height = video.videoHeight / (video.videoWidth / width);

     video.setAttribute('width', width);
     video.setAttribute('height', height);
     canvas.setAttribute('width', width);
     canvas.setAttribute('height', height);

     streaming = true;
   }
 }, false);

 //take photo
 photoButton.addEventListener('click', function(e){
    takePicture();

    e.preventDefault();

 },false);

 //filter event
 photoFilter.addEventListener('change', function(e){
   
  filter = e.target.value;
  //set filter
  video.style.filter = filter;

   e.preventDefault();
 });

 //clear event
 clearButton.addEventListener('click', function(e){

  //clear picture
  photo.innerHTML = '';
  //change filter to normal
  filter = 'none';
  video.style.filter = filter;
  photoFilter.selectedIndex = 0;
 })

 //picture from canvas

 function takePicture(){
  //create canvas

  const context = canvas.getContext('2d');
  if(width && height){

    //set canvas props

    canvas.width = width;
    canvas.height = height;

    //Draw an image of the video to the canvas

    context.drawImage(video, 0, 0, width, height);

    //create image

    const imgUrl = canvas.toDataURL('image/png');
 
    //create image element

    const img = document.createElement('img');

    //set image source
    img.setAttribute('src', imgUrl);

    //set filter to image
    img.style.filter = filter;

    //add image

    photo.appendChild(img);
  }
 }