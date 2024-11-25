import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Input,
  Pagination,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { getTimeAgoString } from "../../utils/Time";
import HeaderSubPage from "../HeaderSubPage";
import { ReactComponent as FileImage } from "../../Assets/icons/fileImage.svg";
import {
  addNewProject,
  deleteProject,
  duplicateProject,
  GetAllProjects,
  updateProject,
} from "../../utils/CRUD_Project";
import { projectType } from "./ProjectPage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RaspberrypiLogo from "../../Assets/RaspberrypiIcon.png";
import simulatorIcon from "../../Assets/simulator.png";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { t } from "i18next";
function ProjectManagement() {
  const { user } = useContext(AuthContext);
  const [projectList, setProjectList] = useState([]);
  const [projectListView, setProjectListView] = useState([]);
  const [projectSizeTotal, setProjectSizeTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialogs] = useState({
    dialog1: false,
    dialog2: false,
    dialog3: false,
  });
  const targetRenameInput = useRef(null);
  const [data, setData] = useState({});
  const numberOfElement = 8;
  const fetchProjects = async () => {
    if (user && user.uid) {
      const projects = await GetAllProjects(user.uid);
      console.log(projects);
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
  const [buttonStatus, setButtonStatus] = useState({
    openButtonStatus: true,
    renameButtonStatus: true,
    duplicateButtonStatus: true,
    deleteButtonStatus: true,
  });

  useEffect(() => {
    console.log(selectedItem);
    if (selectedItem.length > 1) {
      setButtonStatus({
        deleteButtonStatus: false,
        renameButtonStatus: true,
        duplicateButtonStatus: true,
        openButtonStatus: true,
      });
    } else if (selectedItem.length == 1) {
      setButtonStatus({
        deleteButtonStatus: false,
        renameButtonStatus: false,
        duplicateButtonStatus: false,
        openButtonStatus: false,
      });
      setData(selectedItem);
    } else {
      setButtonStatus({
        openButtonStatus: true,
        renameButtonStatus: true,
        duplicateButtonStatus: true,
        deleteButtonStatus: true,
      });
    }
  }, [selectedItem]);
  const RenameProjectDialogOpen = () => {
    let projectTarget = selectedItem[0];
    handleDialogOpen("dialog1");
    // Đợi DOM được render để gán giá trị
    setTimeout(() => {
      if (targetRenameInput.current) {
        targetRenameInput.current.value = projectTarget.name; // Điền tên vào input
      }
    }, 0); // Đợi React cập nhật DOM
    console.log(projectTarget);
  };
  const DuplicateProjectDialogOpen = () => {
    let projectTarget = selectedItem[0];
    console.log(selectedItem);
    handleDialogOpen("dialog2");
    // Đợi DOM được render để gán giá trị
    setTimeout(() => {
      if (targetRenameInput.current) {
        targetRenameInput.current.value = projectTarget.name; // Điền tên vào input
      }
    }, 0); // Đợi React cập nhật DOM
  };
  const DeleteProjectDialogOpen = () => {
    handleDialogOpen("dialog3");
    // Đợi DOM được render để gán giá trị
  };
  const RenameSubmit = async () => {
    let projectTarget = selectedItem[0];
    projectTarget.name = data.projectTitle;
    await updateProject(projectTarget);
    handleDialogClose("dialog1");
  };
  const DuplicateSubmit = async () => {
    let projectTarget = selectedItem[0];
    const newProject = {
      ...projectTarget,
      name:
        data.projectTitle == undefined ? projectTarget.name : data.projectTitle,
      projectId: null,
    };
    console.log(newProject);
    await duplicateProject(user.uid, newProject);
    fetchProjects();

    handleDialogClose("dialog2");
    setSelectedItem([]);
  };
  const DeleteSubmit = async () => {
    await Promise.all(selectedItem.map((current) => deleteProject(current.id)));

    // Sau khi xóa xong, gọi hàm fetchProjects để cập nhật danh sách
    await fetchProjects();
    setCurrentPage(1);
    handleDialogClose("dialog3");
    setSelectedItem([]);
  };
  const handleDialogOpen = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: true }));
  };

  const handleDialogClose = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: false }));
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
  const debouncedOnChange = useCallback(debounce(HandleChangeData, 400), []);

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
            disabled={buttonStatus.openButtonStatus}
          >
            <LaunchIcon className=" fill-primary" />
            <p
              className="text-primaryText normal-case mb-0 mt-0 py-2 px-2 "
              style={
                buttonStatus.openButtonStatus
                  ? { color: "rgba(0, 0, 0, 0.26)" }
                  : {}
              }
            >
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
            disabled={buttonStatus.renameButtonStatus}
            onClick={RenameProjectDialogOpen}
          >
            <DriveFileRenameOutlineIcon className=" fill-primary" />
            <p
              className="text-primaryText normal-case mb-0 mt-0 py-2 px-2"
              style={
                buttonStatus.renameButtonStatus
                  ? { color: "rgba(0, 0, 0, 0.26)" }
                  : {}
              }
            >
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
            disabled={buttonStatus.duplicateButtonStatus}
            onClick={DuplicateProjectDialogOpen}
          >
            <ContentCopyIcon className=" fill-primary" />
            <p
              className="text-primaryText normal-case mb-0 mt-0 py-2 px-2"
              style={
                buttonStatus.duplicateButtonStatus
                  ? { color: "rgba(0, 0, 0, 0.26)" }
                  : {}
              }
            >
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
            disabled={buttonStatus.deleteButtonStatus}
            onClick={DeleteProjectDialogOpen}
          >
            <DeleteIcon
              sx={
                buttonStatus.deleteButtonStatus
                  ? { fill: "currentColor" }
                  : { fill: "red" }
              }
            />
            <p
              className="text-red-600 normal-case mb-0 mt-0 py-2 px-2"
              style={
                buttonStatus.deleteButtonStatus
                  ? { color: "rgba(0, 0, 0, 0.26)" }
                  : {}
              }
            >
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
        <Dialog
          open={openDialog.dialog1}
          onClose={() => handleDialogClose("dialog1")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ width: "100%" }}
        >
          <div className="flex justify-between items-center md:w-[540px] border-b border-black">
            <DialogTitle id="alert-dialog-title" className="text-black">
              {t("ProjectManagement_RenameTitlePopup")}
            </DialogTitle>
            <DialogActions>
              <IconButton onClick={() => handleDialogClose("dialog1")}>
                <CancelIcon />
              </IconButton>
            </DialogActions>
          </div>
          <DialogContent sx={{ padding: "0px 15px" }}>
            <div className="pl-3">
              <input
                type="text"
                ref={targetRenameInput}
                onChange={debouncedOnChange}
                name="projectTitle"
                className="w-full py-1 pl-2 mt-2 text-lg mb-2"
              />
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
                onClick={RenameSubmit}
              >
                <p className="px-2 m-0">
                  {t("ProjectPage_DialogProjectUpdateButton")}
                </p>
                <div className="bg-[#0f760f] p-2">
                  <CheckIcon />
                </div>
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          open={openDialog.dialog2}
          onClose={() => handleDialogClose("dialog2")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ width: "100%" }}
        >
          <div className="flex justify-between items-center md:w-[540px] border-b border-black">
            <DialogTitle id="alert-dialog-title" className="text-black">
              {t("ProjectManagement_DuplicateTitlePopup")}
            </DialogTitle>
            <DialogActions>
              <IconButton onClick={() => handleDialogClose("dialog2")}>
                <CancelIcon />
              </IconButton>
            </DialogActions>
          </div>
          <DialogContent sx={{ padding: "0px 15px" }}>
            <div className="pl-3">
              <input
                type="text"
                ref={targetRenameInput}
                onChange={debouncedOnChange}
                name="projectTitle"
                className="w-full py-1 pl-2 mt-2 text-lg mb-2"
              />
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
                onClick={DuplicateSubmit}
              >
                <p className="px-2 m-0">
                  {t("ProjectPage_DialogProjectDuplicateButton")}
                </p>
                <div className="bg-[#0f760f] p-2">
                  <CheckIcon />
                </div>
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          open={openDialog.dialog3}
          onClose={() => handleDialogClose("dialog3")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ width: "100%" }}
        >
          <div className="flex justify-between items-center md:w-[540px] border-b border-black">
            <DialogTitle id="alert-dialog-title" className="text-black">
              {t("ProjectManagement_DeleteTitlePopup")}
            </DialogTitle>
            <DialogActions>
              <IconButton onClick={() => handleDialogClose("dialog3")}>
                <CancelIcon />
              </IconButton>
            </DialogActions>
          </div>
          <DialogContent sx={{ padding: "0px 15px" }}>
            <div className="pl-3">
              <p>Bạn sẽ xoá hết {selectedItem.length} dự án</p>
            </div>
          </DialogContent>
          <div className="px-2">
            <DialogActions className="flex items-center">
              <Button
                className="bg-red-700"
                sx={{ background: "red", color: "#fff", padding: "0px" }}
                disabled={data?.projectTitle === ""}
                onClick={DeleteSubmit}
              >
                <p className="px-2 m-0">
                  {t("ProjectPage_DialogProjectDeleteButton")}
                </p>
                <div className="bg-red-700 p-2 h-full">
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

export default ProjectManagement;
