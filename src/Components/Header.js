import SettingsIcon from "@mui/icons-material/Settings";
import {
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as DialogButton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { t } from "i18next";
import Popover from "@mui/material/Popover";
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialogs] = useState({
    dialog1: false,
    dialog2: false,
    // Thêm các popup khác tại đây
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDialogOpen = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: true }));
    handleMenuClose();
  };

  const handleDialogClose = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: false }));
  };

  return (
    <div className="bg-[#023ae5] w-full">
      <div className="flex justify-between  px-4 content-center items-center py-1">
        <h1 className="text-white mt-0 mb-0">FSTEM</h1>
        <div>
          <div className="flex">
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                borderRadius: "0px",
                color: "#fff",
                padding: "0 30px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  bgcolor: "unset",
                  "& svg:first-of-type": {
                    transform: "scale(1.2)",
                  },
                },
              }}
            >
              <SettingsIcon sx={{ fontSize: "32px" }} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleDialogOpen("dialog1");
                }}
              >
                {t("languages")}
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <IconButton
              sx={{ borderRadius: "0px", color: "#fff", padding: "0 15px" }}
            >
              <button className="cursor-pointer bg-white text-black flex items-center px-6 border-none rounded-lg w-full">
                <h4 className="text-[16px] px-2">{t("login")}</h4>
                <LoginIcon />
              </button>
            </IconButton>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog.dialog1}
        onClose={() => handleDialogClose("dialog1")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Popup Title"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is the content of the popup. You can put any message or content
            here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogButton onClick={() => handleDialogClose("dialog1")}>
            Close
          </DialogButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
