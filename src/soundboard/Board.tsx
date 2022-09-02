import React, { useState, useEffect } from "react";
import "./Board.css";

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

  function changeAdresses() {
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
        <div onClick={changeAdresses} className="option">⚙️</div>
        <div className="track">Current track: {currentFile}</div>
        <audio
          src={(localStorage.getItem("httpUrl") || "http://127.0.0.1:4000/") + currentFile}
          autoPlay loop controls>
        </audio>
      </div>

      <div className="buttons">
      <button
        key={"nonFile"}
        className={`stop ${(currentFile=="") ? "active" : ""}`}
        onClick={( ) => changeCurrentTrack("")}>
          STOP ALL CLIENTS
      </button>
        {files.map((file, fileIndex) => (
          <>
            <button
              key={"file"+fileIndex}
              className={`${(file==currentFile) ? "active" : ""}`}
              onClick={( ) => changeCurrentTrack(file)}>
                {file}
            </button>
          </>
        ))}
      </div>

    </div>
  );
}

export default Board;
