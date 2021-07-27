const videoTag = document.querySelector('video');

navigator.mediaDevices
   .getUserMedia({ video: true, audio: true })
   .then(algo => {
      videoTag.srcObject = algo;
      videoTag.onloadedmetadata = e => {
         videoTag.play();
         console.log(e);
      };
      const track = algo.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);

      return imageCapture.getPhotoCapabilities();
   })
   .catch(err => {
      console.log(err);
   });
