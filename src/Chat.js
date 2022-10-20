import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Iconbutton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import "./Chat.css";
import { InsertEmoticon, Mic, RepeatOne } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./ifirebase";
// import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import { displayDate } from "./util/helper";
import moment from "moment";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import EmojiPicker from "emoji-picker-react";
// import MicIcon from "@material-ui/MicIcon";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [shoudlShowEmoji, setShouldShowEmoji] = useState(false);

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
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      time: new Date().toString(),
      // : firebase.firestore.FeildValue.servertimestamp(),
    });

    setInput("");
  };

  // alert(user.displayName);
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${roomName}.svg`}
        />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {displayDate(messages[messages.length - 1]?.time)}</p>
        </div>
        <div className="chat_headerRight">
          <Iconbutton>
            <SearchOutlined />
          </Iconbutton>
          {/* <Iconbutton>
            <AttachFile />
          </Iconbutton> */}
          <Iconbutton>
            <MoreVertIcon />
          </Iconbutton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            {console.log({ message })}
            {/* {message.name} */}
            <span className="chat_name"></span>
            {message.message}
            <br />
            <span className="chat_timeStamp">
              {moment(message.time).format("hh:mm A")}
              {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
            </span>
          </p>
        ))}
      </div>
      {/* <Picker /> */}
      {shoudlShowEmoji && (
        <div
          style={{
            position: "fixed",
            bottom: "4rem",
            left: "26rem",
            zIndex: "99",
          }}
        >
          <EmojiPicker
            height={500}
            onEmojiClick={(emoji) => {
              console.log(emoji);
              setInput(input + emoji.emoji);
            }}
            width={400}
          />
        </div>
      )}
      <div className="chat_footer">
        <Iconbutton onClick={() => setShouldShowEmoji((prev) => !prev)}>
          <InsertEmoticon />
        </Iconbutton>

        {/* <Picker onEmojiSelect={console.log} /> */}
        <Iconbutton>
          <AttachFile />
        </Iconbutton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
            autoFocus
            aria-autocomplete="false"
            autoComplete="false"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Iconbutton>
          <Mic className="MIC" />
        </Iconbutton>
      </div>
    </div>
  );
}

export default Chat;
