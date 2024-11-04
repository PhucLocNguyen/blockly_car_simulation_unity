import { Unity, useUnityContext } from "react-unity-webgl";

import React from "react";
function UnityWebGL() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "WebGl/Build/Webgl.loader.js",
    dataUrl: "WebGl/Build/Webgl.data",
    frameworkUrl: "WebGl/Build/Webgl.framework.js",
    codeUrl: "WebGl/Build/Webgl.wasm",
  });

  return (
    <Unity
      style={{ width: "100%", height: "500px" }}
      unityProvider={unityProvider}
    />
  );
}

export default UnityWebGL;
