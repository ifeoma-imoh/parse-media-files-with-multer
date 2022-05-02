import { useState } from "react";
import axios from "axios";

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [file, setFile] = useState(null);
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.set("sample_file", file);
    try {
      const res = await axios.post("/api/upload", data);
      setRes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <label htmlFor="file" className="btn-grey">
        {" "}
        select file
      </label>

      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      {file && <p className="file_name">{file.name}</p>}
      <code>
        {Object.keys(res).map(
          (key) =>
            key && (
              <p className="output-item" key={key}>
                <span>{key}:</span>
                <span>
                  {typeof res[key] === "object" ? "object" : res[key]}
                </span>
              </p>
            )
        )}
      </code>
      {file && (
        <>
          <button className="btn-green" onClick={uploadFile}>
            {loading ? "uploading..." : "upload to Cloudinary"}
          </button>
        </>
      )}
    </div>
  );
}
