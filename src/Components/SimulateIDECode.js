import React, { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./SimulateIDECode.css";

function SimulateIDECode({titleIDE, programmingLanguage, script}) {
  

  const codeRef = useRef(null);

  const handleCopy = () => {
    if (codeRef.current) {
      const textToCopy = codeRef.current.innerText; // Lấy text bao gồm cả khoảng cách dòng
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          alert("Code đã được sao chép thành công!");
        },
        () => {
          alert("Có lỗi khi sao chép code.");
        }
      );
    }
  };

  return (
    <div className="code-container">
      <div className="bg-[#1e1e1e] p-1 w-full flex justify-between">
        <div className="title text-white">{titleIDE}</div>

        <button className="copy-button" onClick={handleCopy}>
          Sao chép mã
        </button>
      </div>
      <div className="">
        <div className="code-box min-h-[300px]" ref={codeRef}>
          <SyntaxHighlighter
            useInlineStyles
            language={programmingLanguage}
            style={darcula}
            wrapLines
          >
            {`${script}`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default SimulateIDECode;
