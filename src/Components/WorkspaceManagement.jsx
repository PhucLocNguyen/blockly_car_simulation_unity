import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WorkspaceSimulation from "./Pages/UnityBlocklySimulation/WorkspaceSimulation";
import WorkingPage from "./Pages/Raspberrypi/WorkingPage";
function WorkspaceManagement() {
  const location = useLocation();
  const projectId = location.state?.id;
  const projectType = location.state?.type;
  const [xmlRemember] = useState(localStorage.getItem("blocklyCache") || "");
  const navigate = useNavigate();
  useEffect(() => {
    if (projectId == null) {
      navigate("/", { state: { message: "Please choose a project to edit" } });
    }
  }, []);
  switch (projectType) {
    case "raspberrypi":
      return <WorkingPage xmlRemember={xmlRemember} projectId={projectId} />;
    case "unity-simulator":
      return (
        <WorkspaceSimulation xmlRemember={xmlRemember} projectId={projectId} />
      );
    default:
      return <Fragment />;
  }
}

export default WorkspaceManagement;
