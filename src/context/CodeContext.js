import { createContext, useEffect, useState } from "react";

export const CodeContext = createContext();
function CodeProvider({children}) {
  const [codeJavascript, setCodeJavascript] = useState(null);

    return (  <CodeContext.Provider value={{ codeJavascript,setCodeJavascript }}>
        {children}
     </CodeContext.Provider> );
}

export default CodeProvider ;