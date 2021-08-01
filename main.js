import funcc from "./index";

// funcc();
(async () => {
  const device = document.querySelector("#devices-id");
  const videoTag = document.querySelector("video");
  const ref = document.querySelector("#ref");

  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioDevices = devices.filter((device) => device.kind === "audioinput");
  audioDevices.forEach(({ label, deviceId }) => {
    // console.log(deviceId);
    device.innerHTML += `<option value=${deviceId}>${label}</option>`;
  });

  // device.addEventListener("change", (e) => {
  //   ref.innerText = e.target.value;
  // });

  device.onchange = async (e) => {
    // console.log(device.options[device.selectedIndex].value);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        deviceId: e.target.value,
        echoCancellation: true,
      },
    });
    videoTag.srcObject = stream;
  };

  // console.log(device.value);

  // "d78521b1a03bdc0f9a2564e0ffd018366baeda891f3305f8dd62d3462a294c40"
})();
