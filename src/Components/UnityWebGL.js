import { Unity, useUnityContext } from "react-unity-webgl";
import React from "react";
function UnityWebGL() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "WebGl/Build/webgl.loader.js",
    dataUrl: "WebGl/Build/webgl.data",
    frameworkUrl: "WebGl/Build/webgl.framework.js",
    codeUrl: "WebGl/Build/webgl.wasm",
  });

  return <Unity unityProvider={unityProvider} />;
}

export default UnityWebGL;