const videoTag = document.querySelector("video");
const audioTag = document.querySelector("audio");

export default function () {
  const audioContext = new AudioContext();

  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 1,
    audioContext.sampleRate
  );

  const channel = buffer.getChannelData(0);

  for (let i = 0; i < buffer.length; i++) {
    channel[i] = Math.random() * 2 - 1;
  }

  const primaryGaincontrol = audioContext.createGain();
  primaryGaincontrol.gain.setValueAtTime(0.05, 0);

  primaryGaincontrol.connect(audioContext.destination);

  const btn = document.createElement("button");
  btn.innerText = "Ruido negro :v";
  btn.addEventListener("click", () => {
    const whiteNoiseSrc = audioContext.createBufferSource();
    whiteNoiseSrc.buffer = buffer;
    whiteNoiseSrc.connect(primaryGaincontrol);
    whiteNoiseSrc.start();
    console.log(audioContext.state);
  });
  document.querySelector("div").appendChild(btn);

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((algo) => {
      videoTag.srcObject = algo;
      // console.log(algo);

      videoTag.onloadedmetadata = (e) => {
        videoTag.play();
        // console.log(e);
      };

      // const track = algo.getVideoTracks()[0];
      // const imageCapture = new ImageCapture(track);
      // return imageCapture.getPhotoCapabilities();
    })
    .catch((err) => {
      console.log(err);
    });
}
