import { Unity, useUnityContext } from "react-unity-webgl";
import React from "react";
function UnityWebGL() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "WebGl/Build/Build.loader.js",
    dataUrl: "WebGl/Build/Build.data",
    frameworkUrl: "WebGl/Build/Build.framework.js",
    codeUrl: "WebGl/Build/Build.wasm",
  });

  return <Unity unityProvider={unityProvider} />;
}

export default UnityWebGL;
