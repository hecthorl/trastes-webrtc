import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [dispositivos, setDispositivos] = useState([]);
  const [currentAudioDevice, setCurrentAudioDevice] = useState("");
  // const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((item) => {
      const audioDevices = item.filter(({ deviceId, kind }) => {
        return deviceId.length === 64 && kind === "audioinput";
      });
      setDispositivos(audioDevices);
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: { deviceId: currentAudioDevice },
        video: true,
      })
      .then((mediaStream) => {
        // setVideoSrc(stream);
        console.log(mediaStream);
        videoRef.current.srcObject = mediaStream;
      });
  }, [currentAudioDevice]);

  const handleAudioChange = (e) => {
    setCurrentAudioDevice(e.target.value);
  };

  return (
    <div className="App">
      <select value={currentAudioDevice} onChange={handleAudioChange}>
        {dispositivos.map((item, id) => {
          return (
            <option value={item.deviceId} key={id}>
              {item.label}
            </option>
          );
        })}
      </select>
      <video muted autoPlay ref={videoRef} controls></video>
    </div>
  );
}

export default App;
