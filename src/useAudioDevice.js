import { useState, useEffect } from "react";

const useAudioDevice = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [currentAudioDevice, setCurrentAudioDevice] = useState("");

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((item) => {
      const audioDevices = item.filter(({ deviceId, kind }) => {
        return deviceId.length === 64 && kind === "audioinput";
      });
      setDispositivos(audioDevices);
    });
  }, [currentAudioDevice]);

  const handleAudioChange = (e) => {
    setCurrentAudioDevice(e.target.value);
  };

  return { dispositivos, currentAudioDevice, handleAudioChange };
};

export default useAudioDevice;
