import { Unity, useUnityContext } from "react-unity-webgl";
import React, { Fragment, useEffect } from "react";

function UnityWebGL({ code }) {
  const { unityProvider } = useUnityContext({
    loaderUrl: "WebGl/Build/WebGLDat.loader.js",
    dataUrl: "WebGl/Build/WebGLDat.data",
    frameworkUrl: "WebGl/Build/WebGLDat.framework.js",
    codeUrl: "WebGl/Build/WebGLDat.wasm",
  });

  useEffect(() => {
    console.log(code);
    // executeCode(); // Chạy `executeCode` mỗi khi `codeJavascript` thay đổi
  }, []); // Chỉ lắng nghe `codeJavascript`

  return (
    <div id="unity-root">
      <Unity
        style={{ width: "100%", height: "500px" }}
        unityProvider={unityProvider}
      />
    </div>
  );
}
export default UnityWebGL;
