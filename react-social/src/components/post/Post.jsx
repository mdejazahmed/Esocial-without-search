import React, { useContext } from 'react';
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios"
import {format} from 'timeago.js'
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';

export default function Post({ postDetails }) {
  const [like,setLike] = useState(postDetails.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const {user:currentUser}=useContext(AuthContext);

  const pf=process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    setIsLiked(postDetails.likes.includes(currentUser._id));
  },[currentUser._id,postDetails.likes])

  useEffect(()=>{
    const fetchUser= async ()=>{
      const response=await axios.get(`/users?userId=${postDetails.userId}`);
      setUser(response.data);
    };
    fetchUser();
  },[postDetails.userId]);

  const likeHandler =async()=>{
    try {
      await axios.put("/posts/"+postDetails._id+"/like",{userId:currentUser._id})
    } catch (error) {
      
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`profile/${user.username}`}>
          <img
              className="postProfileImg"
              src={user.profilePic?pf+user.profilePic:pf+"/person/noProfile.png"}
              alt=""
            />
          </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(postDetails.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{postDetails.desc}</span>
          <img className="postImg" src={pf+postDetails.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${pf}/like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${pf}/heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{postDetails.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
