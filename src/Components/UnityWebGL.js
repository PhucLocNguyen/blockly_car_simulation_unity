import { Unity, useUnityContext } from "react-unity-webgl";
import React, { Fragment, useEffect, useState } from "react";
import Car from "../Classes/Car";
function UnityWebGL({ code = "", toogleClick = false }) {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "WebGl/Build/WebGl.loader.js",
    dataUrl: "WebGl/Build/WebGl.data",
    frameworkUrl: "WebGl/Build/WebGl.framework.js",
    codeUrl: "WebGl/Build/WebGl.wasm",
  });
  const car = new Car(sendMessage, "Maruti800");

  useEffect(() => {
    eval(code);
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
