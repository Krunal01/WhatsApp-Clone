import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Iconbutton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import "./Chat.css";
import { InsertEmoticon, Mic } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./ifirebase";
// import firebase from "firebase";
import { useStateValue } from "./StateProvider";
// import MicIcon from "@material-ui/MicIcon";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("/rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("time", "asc")
        .onSnapshot((snapshot) => {
          console.log("this is new ", messages);
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You type ", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      time: new Date(),
      // : firebase.firestore.FeildValue.servertimestamp(),
    });

    setInput(" ");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
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
        {messages.map((message) => (
          <p className={`chat_message ${true && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timeStamp">
              3.53pm
              {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
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
