import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

function HeaderSubPage({ title = "" }) {
  title = title.trim();
  return (
    <div className="bg-[#023ae5] relative w-full items-center">
      <div className=" py-4 inline-block px-2">
        <Link to="/">
          <IconButton>
            <WestIcon style={{ fill: "#fff", fontSize:"32px" }} />
          </IconButton>
        </Link>
      </div>
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <h1 className="text-white mt-0 mb-0 text-center">{title}</h1>
      </div>
    </div>
  );
}

export default HeaderSubPage;
