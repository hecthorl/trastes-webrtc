import funcc from "./index";

// funcc();
(async () => {
  const device = document.querySelector("#devices-id");
  const videoTag = document.querySelector("video");

  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioDevices = devices.filter((device) => device.kind === "audioinput");
  audioDevices.forEach(({ label, deviceId }) => {
    // console.log(deviceId);
    device.innerHTML += `
  <option value=${deviceId}>${label}</option>
`;
  });

  const useState = (state) => {
    const setState = (newState) => newState;
    return [state, setState];
  };

  const [state, setState] = useState("");

  device.onchange = () => {
    setState(device.options[device.selectedIndex].value);
  };
  //"d78521b1a03bdc0f9a2564e0ffd018366baeda891f3305f8dd62d3462a294c40"

  // console.log(device.value);

  const instancee = await navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId:
        "d78521b1a03bdc0f9a2564e0ffd018366baeda891f3305f8dd62d3462a294c40",
    },
    video: { noiseSuppression: !true },
  });
  videoTag.srcObject = instancee;
  videoTag.onloadedmetadata = () => videoTag.play();
})();
