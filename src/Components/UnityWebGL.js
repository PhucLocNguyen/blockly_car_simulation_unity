import { Unity, useUnityContext } from "react-unity-webgl";
import React, { Fragment, useEffect, useState } from "react";
import Car from "../Classes/Car";
const handleUnityData = (event) => {
  console.log("Data received from Unity:", event.detail);
  return event?.detail;
};

function UnityWebGL({
  code = "",
  toogleClick = false,
  isReset = false,
  setIsReset,
}) {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "WebGl/Build/WebGl.loader.js",
    dataUrl: "WebGl/Build/WebGl.data",
    frameworkUrl: "WebGl/Build/WebGl.framework.js",
    codeUrl: "WebGl/Build/WebGl.wasm",
  });
  const car = new Car(sendMessage, "dangster_v2");

  const [sensorData, setSensorData] = useState(null);

  // useEffect(() => {
  //   const handleUnityData = (event) => {
  //     console.log("Data received from Unity:", event.detail);
  //     setSensorData(event.detail);
  //     console.log(event.detail)

  //   };

  //   window.addEventListener("UnityData", handleUnityData);

  //   return () => {
  //     window.removeEventListener("UnityData", handleUnityData);
  //   };
  // }, []);
  useEffect(() => {
    if (isReset) {
      // reset lai game
      car.resetCar();
      setIsReset(false);
    }
  }, [isReset]);
  useEffect(() => {
    if (code && !isReset) {
      try {
        eval(code); // Thực thi code từ props
      } catch (e) {
        console.error("Error evaluating code:", e);
      }
    }
  }, [code, toogleClick]);

  return (
    <div id="unity-root" className=" disabled ">
      <Unity
        style={{ width: "100%", height: "500px", pointerEvents: "none" }}
        unityProvider={unityProvider}
        tabIndex={-1}
      />
    </div>
  );
}
export default UnityWebGL;
