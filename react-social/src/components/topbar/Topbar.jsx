import React, { useContext } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const onLogOut=()=>{
    localStorage.clear("user")
    window.location.reload();
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logoLink">
          <span className="logo">ESocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for name, email or contact number"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img
          src={user.profilePic ? pf+user.profilePic : pf+"/person/noProfile.png"}
          alt=""
          className="topbarImg"
        />
        </Link>
        <button type="button" className="logOutBtn" onClick={onLogOut}>
        Log Out
        </button>
      </div>
    </div>
  );
}
