import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import { ReactComponent as FileImage } from "../../Assets/icons/fileImage.svg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addNewProject, GetAllProjects } from "../../utils/CRUD_Project";
import { getTimeAgoString } from "../../utils/Time";
import RaspberrypiLogo from "../../Assets/RaspberrypiIcon.png";
import simulatorIcon from "../../Assets/simulator.png";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
export const projectType = [
  {
    title: "Vehicle simulator block",
    type: "unity-simulator",
    image: simulatorIcon,
  },
  {
    title: "Raspberry pi block",
    type: "raspberrypi",
    image: RaspberrypiLogo,
  },
];
function ProjectPage() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    projectTitle: "",
    type: "unity-simulator",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [projectList, setProjectList] = useState([]);
  const [openDialog, setOpenDialogs] = useState({
    dialog1: false,
  });
  const CreateProject = async () => {
    if (user == null) {
      return;
    }
    await addNewProject(user.uid, data.projectTitle, data.type);
    // khi click vào tạo mới project
    fetchProjects();
    handleDialogClose("dialog1");
  };
  const handleDialogOpen = (dialogKey) => {
    if (user == null) navigate("/login", { from: location });
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: true }));
  };

  const handleDialogClose = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: false }));
  };
  const OpenProject = (projectId, projectType = "unity-simulator") => {
    // khi click vào project cũ
    navigate("/editor", { state: { id: projectId, type: projectType } });
  };

  const fetchProjects = async () => {
    if (user && user.uid) {
      const projects = await GetAllProjects(user.uid);
      setProjectList(projects);
    }
  };
  const HandleChangeData = (e) => {
    var { name, value } = e.target;
    if (typeof value === "string") {
      value = value.trim();
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    fetchProjects();
    const messageAlert = location.state?.message || null;
    messageAlert && toast.info(messageAlert);
  }, []);

  const debouncedOnChange = useCallback(debounce(HandleChangeData, 400), []);
  return (
    <div>
      {/* Projects Section */}
      <Container maxWidth="xl">
        <Box sx={{ py: 2 }} />
        <Box className="flex items-center gap-2 ">
          <Typography variant="h5" gutterBottom>
            Dự án của tôi
          </Typography>
          <Link to="/projects" className="no-underline">
            View all
          </Link>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(5, 1fr)" },
            gap: "40px",
          }}
        >
          <Box
            onClick={() => handleDialogOpen("dialog1")}
            className="no-underline"
            sx={{ cursor: "pointer" }}
          >
            <Card
              sx={{
                bgcolor: "rgba(102, 51, 204, .9)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                height: "100%",
                padding: "20px 0px",
              }}
            >
              <AddCircleIcon
                sx={{ fill: "#fff", width: "60px", height: "60px" }}
              />
              <Typography variant="h6">Dự án mới</Typography>
            </Card>
          </Box>
          {projectList.map((current) => {
            return (
              <Card
                key={current.id}
                onClick={() => OpenProject(current.id, current.type)}
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
        </Box>
        <Dialog
          open={openDialog.dialog1}
          onClose={() => handleDialogClose("dialog1")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="flex justify-between items-center md:w-[540px] border-b border-black">
            <DialogTitle id="alert-dialog-title" className="text-black">
              {"Create a Project"}
            </DialogTitle>
            <DialogActions>
              <IconButton onClick={() => handleDialogClose("dialog1")}>
                <CancelIcon />
              </IconButton>
            </DialogActions>
          </div>

          <DialogContent sx={{ padding: "0px 25px" }}>
            <DialogContentText id="alert-dialog-description">
              Give your project a name.
            </DialogContentText>
            <div className="pl-1">
              <input
                onChange={debouncedOnChange}
                name="projectTitle"
                className="w-full py-1 pl-2 mt-2 text-lg mb-2"
                type="text"
                autoComplete={"false"}
                autoCorrect={"false"}
              />
              <DialogContentText className="mt-2">
                Choose a type for project
              </DialogContentText>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.type}
                name="type"
                label="Chọn giá trị"
                onChange={HandleChangeData}
              >
                {projectType.map((current) => {
                  return (
                    <MenuItem key={current.title} value={current.type}>
                      {current.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </DialogContent>
          <div className="px-2">
            <DialogActions className="flex items-center">
              <Button
                className={
                  data?.projectTitle === "" ? "bg-[#14b914]" : "bg-[#107c10]"
                }
                sx={{ background: "#107c10", color: "#fff", padding: "0px" }}
                disabled={data?.projectTitle === ""}
                onClick={CreateProject}
              >
                <p className="px-2">Create</p>
                <div className="bg-[#0f760f] p-2">
                  <CheckIcon />
                </div>
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Container>
    </div>
  );
}

export default ProjectPage;
