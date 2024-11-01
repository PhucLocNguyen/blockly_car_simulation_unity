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
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import { ReactComponent as FileImage } from "../../Assets/icons/fileImage.svg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addNewProject, GetAllProjects } from "../../utils/CRUD_Project";
import { getTimeAgoString } from "../../utils/Time";
function ProjectPage() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    projectTitle: "Untitled",
    type: "unity-simulator",
  });
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [openDialog, setOpenDialogs] = useState({
    dialog1: false,
  });
  const CreateProject = async () => {
    await addNewProject(user.uid, data.projectTitle, data.type);
    // khi click vào tạo mới project
    fetchProjects();
    handleDialogClose("dialog1");
  };
  const handleDialogOpen = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: true }));
  };

  const handleDialogClose = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: false }));
  };
  const OpenProject = (projectId) => {
    // khi click vào project cũ
    navigate("/editor-simulation", { state: { id: projectId } });
  };

  const fetchProjects = async () => {
    if (user && user.uid) {
      const projects = await GetAllProjects(user.uid);
      setProjectList(projects);
    }
  };
  const HandleChangeData = (e) => {
    const { name, value } = e.target;
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
  }, []);

  const debouncedOnChange = useCallback(debounce(HandleChangeData, 400), []);
  return (
    <div>
      {/* Projects Section */}
      <Container>
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
                onClick={() => OpenProject(current.id)}
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
                  <Typography variant="h6">{current.name}</Typography>
                  <FileImage
                    style={{ width: "50px", height: "50px", marginTop: 16 }}
                    fill="#333"
                  />
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

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.type}
                name="type"
                label="Chọn giá trị"
                onChange={HandleChangeData}
              >
                <MenuItem value="unity-simulator">Simulation</MenuItem>
                <MenuItem value="raspberrypi">Raspberry pi</MenuItem>
              </Select>
            </div>
          </DialogContent>
          <div className="px-2">
            <DialogActions className="flex items-center">
              <Button
                className="bg-[#107c10]"
                sx={{ background: "#107c10", color: "#fff", padding: "0px" }}
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
