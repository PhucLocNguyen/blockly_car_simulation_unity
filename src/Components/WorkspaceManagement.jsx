import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import WorkspaceSimulation from "./Pages/UnityBlocklySimulation/WorkspaceSimulation";
import WorkingPage from "./Pages/Raspberrypi/WorkingPage";
function WorkspaceManagement() {
  const location = useLocation();
  const projectId = location.state?.id;
  const projectType = location.state?.type;
  const [xmlRemember] = useState(localStorage.getItem("blocklyCache") || "");
  switch (projectType) {
    case "raspberrypi":
      return <WorkingPage xmlRemember={xmlRemember} projectId={projectId} />;
      break;
    case "unity-simulator":
      return (
        <WorkspaceSimulation xmlRemember={xmlRemember} projectId={projectId} />
      );
      break;
    default:
      return <Fragment />;
      break;
  }
}

export default WorkspaceManagement;
