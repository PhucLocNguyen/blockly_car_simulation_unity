import { Unity, useUnityContext } from "react-unity-webgl";
import React, { Fragment, useEffect } from "react";

function UnityWebGL({ code }) {
  const { unityProvider,sendMessage } = useUnityContext({
    loaderUrl: "WebGl/Build/NoInput.loader.js",
    dataUrl: "WebGl/Build/NoInput.data",
    frameworkUrl: "WebGl/Build/NoInput.framework.js",
    codeUrl: "WebGl/Build/NoInput.wasm",
  });

  useEffect(() => {
    // Xóa các listener sự kiện bàn phím do WebGL thêm vào (nếu có)
    sendMessage("TruckVehicle","DisableKeyboardInput")
  }, []);
  
  return (
    <div id="unity-root" className=" disabled ">
      <Unity
        style={{ width: "100%", height: "500px", pointerEvents:"none" }}
        unityProvider={unityProvider}
        tabIndex={-1} 
      />
    </div>
  );
}
export default UnityWebGL;
