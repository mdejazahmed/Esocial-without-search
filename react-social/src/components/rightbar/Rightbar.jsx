import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";

export default function Rightbar({ user }) {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isFollow, setIsFollow] = useState(false);

  // useEffect(() => {
  //   setIsFollow(currentUser.followings.includes(user._id));
  // }, [currentUser, user._id]);

  useEffect(() => {
    const getFriendsList = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriendsList();
  }, [user]);

  const onFollowBtn = async () => {
    try {
      if (!isFollow) {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
      } else {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsFollow(!isFollow);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Ejaz</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="connectionBtn" onClick={onFollowBtn}>
            {isFollow ? "Remove Connection" : "Add Connection"}
            {isFollow ? <PersonAddDisabledIcon /> : <PersonAddAlt1Icon />}
          </button>
        )}

        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((eachFriend) => (
            <Link
              className="friendsProfileLink"
              to={"/profile/" + eachFriend.username}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    eachFriend.profilePic
                      ? pf + eachFriend.profilePic
                      : pf + "/person/noProfile.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {eachFriend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
