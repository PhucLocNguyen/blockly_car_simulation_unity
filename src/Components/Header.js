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
} from "@mui/material";
import * as Blockly from "blockly/core";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { useContext, useEffect, useState } from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SignOut from "../utils/SignOut";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import UKFlag from "../Assets/EnglishUKFlag.png";
import VNFlag from "../Assets/vietnameseFlag.png";
import * as localeVi from "blockly/msg/vi";
import * as localeEn from "blockly/msg/en";
const languages = [
  { languageCode: "en", languageTitle: "English", image: UKFlag },
  { languageCode: "vi", languageTitle: "Tiếng Việt", image: VNFlag },
];
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openDialog, setOpenDialogs] = useState({
    dialog1: false,
  });
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "vi"
  );
 
  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    setLanguage(value);
    localStorage.setItem("language",value);
  };
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogout = async () => {
    await SignOut();
    navigate("/login", { replace: true });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const handleDialogOpen = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: true }));
    handleMenuClose();
  };

  const handleDialogClose = (dialogKey) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogKey]: false }));
  };

  useEffect(() => {
    // Thay đổi ngôn ngữ của Blockly theo ngôn ngữ hiện tại
    var tempLanguage = localStorage.getItem("language");
    Blockly.setLocale(tempLanguage == "vi" ? localeVi : localeEn);
    // loadLocale(tempLanguage);
  }, [language]);
  return (
    <div className="bg-[#023ae5] w-full">
      <div className="flex justify-between px-4 content-center items-center py-1">
        <h1 className="text-white mt-0 mb-0">FSTEM</h1>
        <div>
          <div className="flex">
            <IconButton
              id="settings-button"
              aria-controls={anchorEl ? "settings-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
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
              id="settings-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "settings-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleDialogOpen("dialog1");
                }}
              >
                {t("languages")}
              </MenuItem>
            </Menu>

            {user == null ? (
              <Link to="/login">
                <IconButton
                  sx={{ borderRadius: "0px", color: "#fff", padding: "0 15px" }}
                >
                  <button className="cursor-pointer bg-white text-black flex items-center px-6 border-none rounded-lg w-full">
                    <h4 className="text-[16px] px-2">{t("login")}</h4>
                    <LoginIcon />
                  </button>
                </IconButton>
              </Link>
            ) : (
              <>
                <IconButton
                  onClick={handleClick2}
                  sx={{
                    borderRadius: "0px",
                    color: "#fff",
                    padding: "0 30px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      bgcolor: "unset",
                      "& img:first-of-type": {
                        transform: "scale(1.2)",
                      },
                    },
                  }}
                >
                  <div className="px-2">
                    <img
                      src={user?.photoURL}
                      alt={`${user.email}-thumbnail`}
                      className="rounded-full border border-white w-8"
                    />
                  </div>
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl2}
                  open={Boolean(anchorEl2)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "user-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleDialogOpen("dialog1");
                    }}
                  >
                    Edit profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    Sign out
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </div>
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
            Choose a language
          </DialogTitle>
          <DialogActions>
            <IconButton onClick={() => handleDialogClose("dialog1")}>
              <CancelIcon />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent sx={{ padding: "0px 25px" }}>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-4 mb-[30px] gap-4">
              {languages.map((item, index) => (
                <label
                  key={item.languageTitle + index}
                  htmlFor={"language-" + item.languageTitle}
                  className="rounded-md border border-[#646464] cursor-pointer"
                >
                  <div className="shadow-lg h-[100px]">
                    <input
                      type="radio"
                      name="language"
                      id={"language-" + index}
                      className=" peer"
                      onChange={HandleChangeData}
                      value={item.languageCode}
                      checked={item.languageCode===localStorage.getItem("language")}
                    />
                    <img
                      src={item.image}
                      className="rounded-md w-full object-cover h-[50px]"
                    />
                    <p className="text-center">{item.name}</p>
                  </div>
                </label>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
