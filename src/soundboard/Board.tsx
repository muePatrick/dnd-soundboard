import React, { useState, useEffect } from "react";
import "./Board.css";
import SoundButton from "./SoundButton"

function Board() {
  const [files, setFiles] = useState([])
  const [currentFile, setCurrentFile] = useState("")

  const socket = new WebSocket(localStorage.getItem("wsUrl") || "ws://127.0.0.1:5000");

  useEffect(() => {
    getFileList()
  }, [])

  function getFileList() {
    fetch(localStorage.getItem("httpUrl") || "http://127.0.0.1:4000/")
      .then((response) => response.json())
      .then((data) => setFiles(data.availableFiles));
  }

  function changeAddresses() {
    const newWsUrl:string = prompt("Enter a new WS URL:") || "ws://127.0.0.1:5000"
    localStorage.setItem("wsUrl", newWsUrl)
    const newHttpUrl:string = prompt("Enter a new HTTP URL:") || "http://127.0.0.1:4000/"
    localStorage.setItem("httpUrl", newHttpUrl)
  }

  function changeCurrentTrack(newTrack:string) {
    setCurrentFile(newTrack)
    socket.send(newTrack)
  }

  socket.addEventListener("message", (event) => {
    setCurrentFile(event.data)
  });

  return (
    <div className="page">
      <div className="player">
        <div onClick={changeAddresses} className="option">⚙️</div>
        <div className="track">Current track: {currentFile}</div>
        <audio
          src={(localStorage.getItem("httpUrl") || "http://127.0.0.1:4000/") + currentFile}
          autoPlay loop controls>
        </audio>
      </div>

      <div className="buttons">
      <SoundButton
        key={"nonFile"}
        isActive={currentFile==""}
        isStop={true}
        onClick={changeCurrentTrack}
        file={""}
        text="STOP ALL CLIENTS" />
        {files.map((file, fileIndex) => (
          <>
            <SoundButton
              key={"file"+fileIndex}
              isActive={file==currentFile}
              onClick={changeCurrentTrack}
              file={file} />
          </>
        ))}
      </div>

    </div>
  );
}

export default Board;
