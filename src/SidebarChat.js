import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./SidebarChat.css";
import db from "./ifirebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt("Enter name for chat");

    if (roomName) {
      //database stuff
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  const nav = useNavigate();
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div
        onClick={(e) => {
          nav(`/rooms/${id}`);
        }}
      >
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>Last message...</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
