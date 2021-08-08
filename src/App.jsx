import "./App.css";
import { useState, useEffect, useRef } from "react";
import useAudioDevice from "./useAudioDevice";

function App() {
  const { currentAudioDevice, dispositivos, handleAudioChange } =
    useAudioDevice();
  const videoRef = useRef(null);

  console.log({ dispositivos });

  const defaultDevice = dispositivos[0]?.deviceId;

  const [contrains, setContrains] = useState({
    video: true,
    audio: { deviceId: defaultDevice },
  });
  // console.log({ defaultDevice });

  useEffect(() => {
    setContrains({
      audio: { deviceId: currentAudioDevice },
      ...contrains,
    });
  }, [currentAudioDevice]);

  // useEffect(() => {
  //   console.log(contrains);

  // }, []);
  navigator.mediaDevices.getUserMedia(contrains).then((mediaStream) => {
    console.log(mediaStream);
    videoRef.current.srcObject = mediaStream;
  });

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
