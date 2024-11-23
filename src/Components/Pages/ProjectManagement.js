import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Input,
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
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
function ProjectManagement() {
  const { user } = useContext(AuthContext);
  const [projectList, setProjectList] = useState([]);
  const [projectListView, setProjectListView] = useState([]);
  const [projectSizeTotal, setProjectSizeTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfElement = 8;
  const fetchProjects = async () => {
    if (user && user.uid) {
      const projects = await GetAllProjects(user.uid);
      setProjectList(projects);
      const size = projects.length;
      setProjectSizeTotal(size);
    }
  };
  const [selectedItem, setSelectedItem] = useState([]);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  useEffect(() => {
    const startIndex = (currentPage - 1) * numberOfElement;
    const endIndex = startIndex + numberOfElement;

    // Lọc các dự án thuộc trang hiện tại
    const filterProjectView = projectList.slice(startIndex, endIndex);
    setProjectListView(filterProjectView);
  }, [currentPage, projectList]);

  const handleToggleSelect = (project) => {
    setSelectedItem((prevSelected) => {
      // Kiểm tra nếu phần tử đã có trong danh sách selectedItem
      if (prevSelected.some((item) => item.id === project.id)) {
        // Xóa phần tử khỏi danh sách
        return prevSelected.filter((item) => item.id !== project.id);
      } else {
        // Thêm phần tử vào danh sách
        return [...prevSelected, project];
      }
    });
  };
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
  return (
    <div>
      <HeaderSubPage title="My Projects" />
      <div className="w-full bg-primary py-2 ">
        <Container
          maxWidth="xl"
          sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <Button
            sx={{
              background: "#fff",
              border: "1px solid transparent",
              minWidth: "110px",
              ":hover": {
                border: "1px solid #000", // Màu nền khi hover
              },
            }}
          >
            <LaunchIcon className=" fill-primary" />
            <p className="text-primaryText normal-case mb-0 mt-0 py-2 px-2 ">
              Open
            </p>
          </Button>
          <Button
            sx={{
              background: "#fff",
              border: "1px solid transparent",
              minWidth: "110px",
              ":hover": {
                border: "1px solid #000", // Màu nền khi hover
              },
            }}
          >
            <DriveFileRenameOutlineIcon className=" fill-primary" />
            <p className="text-primaryText normal-case mb-0 mt-0 py-2 px-2">
              Rename
            </p>
          </Button>
          <Button
            sx={{
              background: "#fff",
              border: "1px solid transparent",
              minWidth: "110px",
              ":hover": {
                border: "1px solid #000", // Màu nền khi hover
              },
            }}
          >
            <ContentCopyIcon className=" fill-primary" />
            <p className="text-primaryText normal-case mb-0 mt-0 py-2 px-2">
              Duplicate
            </p>
          </Button>
          <Button
            sx={{
              background: "#fff",
              border: "1px solid transparent",
              minWidth: "110px",
              ":hover": {
                border: "1px solid #000", // Màu nền khi hover
              },
            }}
          >
            <DeleteIcon sx={{ fill: "red" }} />
            <p className="text-red-600 normal-case mb-0 mt-0 py-2 px-2">
              Delete
            </p>
          </Button>
        </Container>
      </div>

      <Container maxWidth="xl">
        <div className="mt-2 grid md:grid-cols-4 md:gap-4">
          {projectListView.map((current) => {
            return (
              <Card
                key={current.id}
                onClick={() => {
                  handleToggleSelect(current);
                }}
                className="cursor-pointer"
              >
                {selectedItem.some((item) => item.id === current.id) && (
                  <div className="ml-2">
                    <Typography color="green" fontWeight="bold">
                      ✔️
                    </Typography>
                  </div>
                )}
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
        <div className="flex justify-center items-center mt-6">
          <Pagination
            count={Math.ceil(projectSizeTotal / numberOfElement)}
            page={currentPage}
            color="primary"
            onChange={handleChange}
          />
        </div>
      </Container>
    </div>
  );
}

export default ProjectManagement;
