import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./SimulateIDECode.css";

function SimulateIDECode({titleIDE, programmingLanguage, script}) {
  
  const { t } = useTranslation();

  const codeRef = useRef(null);

  const handleCopy = () => {
    if (codeRef.current) {
      const textToCopy = codeRef.current.innerText; // Lấy text bao gồm cả khoảng cách dòng
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          alert(`${t("copy_success_message")}`);
        },
        () => {
          alert(`${t("copy_failed_message")}`);
        }
      );
    }
  };

  return (
    <div className="code-container">
      <div className="bg-[#1e1e1e] p-1 w-full flex justify-between">
        <div className="title text-white">{titleIDE}</div>

        <button className="copy-button" onClick={handleCopy}>
        {t("copyButton")}
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
