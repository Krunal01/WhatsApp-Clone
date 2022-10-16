import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
// import DonutLargeIcon from "@material-ui/core/icons/DonutLargeIcon";

import SidebarChat from "./SidebarChat";
import db from "./firebase";
// import { useStateValue } from "react";
import { StateContext } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useContext(StateContext);
  // console.log(state);
  // let state = {};
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      console.log(snapshot.docs.map((_) => console.log(_.data())));
      let nArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setRooms(nArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      {/* <h1>Sidebar</h1> */}

      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat " type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
