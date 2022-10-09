import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Iconbutton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import "./Chat.css";
import { InsertEmoticon, Mic } from "@material-ui/icons";
// import MicIcon from "@material-ui/MicIcon";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You type ", input);
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen ...</p>
        </div>
        <div className="chat_headerRight">
          <Iconbutton>
            <SearchOutlined />
          </Iconbutton>
          <Iconbutton>
            <AttachFile />
          </Iconbutton>
          <Iconbutton>
            <MoreVertIcon />
          </Iconbutton>
        </div>
      </div>
      <div className="chat_body">
        <p className={`chat_message ${true && "chat_reciever"} `}>
          <span className="chat_name">Hello</span>
          Hey!!
          <span className="chat_timeStamp">3.53pm</span>
        </p>
        <p className="chat_message">Hey!!</p>
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            vlaue={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
