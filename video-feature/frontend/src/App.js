import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const res = await axios.get("http://localhost:5001/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) return alert("Please select a video file");

    const formData = new FormData();
    formData.append("video", video);

    const uploadRes = await axios.post("http://localhost:5001/upload", formData);
    const videoUrl = uploadRes.data.videoUrl;

    await axios.post("http://localhost:5001/save", { title, desc, videoUrl });

    setTitle("");
    setDesc("");
    setVideo(null);
    fetchVideos();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Upload Skill Video</h1>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br/><br/>
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        /><br/><br/>
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} /><br/><br/>
        <button type="submit">Upload</button>
      </form>

      <hr />

      <h2>Uploaded Videos</h2>
      {videos.map((v, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
          <video width="400" height="300" controls src={v.videoUrl}></video>
        </div>
      ))}
    </div>
  );
}

export default App;
