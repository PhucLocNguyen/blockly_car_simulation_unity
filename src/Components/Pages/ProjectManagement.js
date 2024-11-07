import {
  Card,
  CardContent,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import { getTimeAgoString } from "../../utils/Time";
import HeaderSubPage from "../HeaderSubPage";
import { ReactComponent as FileImage } from "../../Assets/icons/fileImage.svg";
import { addNewProject, GetAllProjects } from "../../utils/CRUD_Project";
import { projectType } from "./ProjectPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RaspberrypiLogo from "../../Assets/RaspberrypiIcon.png";
import simulatorIcon from "../../Assets/simulator.png";
function ProjectManagement() {
  const { user } = useContext(AuthContext);
  const [projectList, setProjectList] = useState([]);
  const fetchProjects = async () => {
    if (user && user.uid) {
      const projects = await GetAllProjects(user.uid);
      setProjectList(projects);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <HeaderSubPage title="My Projects" />
      <Container maxWidth="xl">
        <div className="mt-2 grid md:grid-cols-4">
          {projectList.map((current) => {
            return (
              <Card
                key={current.id}
                onClick={() => {}}
                className="cursor-pointer"
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <Typography variant="h6" className="lineClamp1Format">
                    {current.name}
                  </Typography>
                  <div className="flex items-center">
                    <FileImage
                      style={{ width: "50px", height: "50px" }}
                      fill="#333"
                    />
                    <AddIcon />
                    <img
                      src={
                        current?.type == "raspberrypi"
                          ? RaspberrypiLogo
                          : simulatorIcon
                      }
                      className="h-[50px] w-[50px]"
                    />
                  </div>

                  <Typography color="textSecondary" textAlign="right" mt={2}>
                    {getTimeAgoString(current.updatedAt)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <Pagination count={10} color="primary" />
        </div>
      </Container>
    </div>
  );
}

export default ProjectManagement;
