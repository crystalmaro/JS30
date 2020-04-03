const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  // this returns a Promise object
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream)
      // video src either mp4 or an URL
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error('error: ' + err);
    })
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    // drawImage: pass in an img or video element
    ctx.drawImage(video, 0, 0, width, height)

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // manipulate the pixels
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    // ctx.globalAlpha = 0.8 // creates the ghosting effect
    pixels = greenScreen(pixels)
    
    // put the pixels back
    ctx.putImageData(pixels, 0, 0)
  }, 16);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas (raw base64)
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100 // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // blue
  }
  return pixels
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0] // red
    pixels.data[i + 100] = pixels.data[i + 1] // green
    pixels.data[i - 150] = pixels.data[i + 2] // blue
  }
  return pixels
}

function greenScreen(pixels) {
  // (?) how does green screen work
  // the object holds min and max of green
  // give me all the colors inbetween this rgb value
  // and take them out (certain range of special greens)
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        // take it out by setting the transparency alpha to 0
        pixels.data[i + 3] = 0;
      }
  }
  
  return pixels
}

getVideo();

// once the video inside getVideo is played
// it'll emit a canplay event, and trigger paint to canvas
video.addEventListener('canplay', paintToCanvas);
