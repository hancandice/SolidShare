import React, { ChangeEvent, useRef } from 'react';

interface Video {
  title: string;
  hash: string;
}

interface MainProps {
  videos: Video[];
  captureFile: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadVideo: (title: string) => void;
  changeVideo: (hash: string, title: string) => void;
}

const Main: React.FC<MainProps> = ({
  videos,
  captureFile,
  uploadVideo,
  changeVideo,
}) => {

  const latestVideo = videos[0]  
  const videoTitleRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = videoTitleRef.current?.value || '';
    uploadVideo(title);
  };

  return (
    <div className="container-fluid text-monospace">
      <br />
      &nbsp;
      <br />
      <div className="row">
        {latestVideo && <div className="col-md-10">
          <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
            <video
              src={`https://ipfs.infura.io/ipfs/${latestVideo.hash}`}
              controls
            />
          </div>
          <h3><b><i>{latestVideo.title}</i></b></h3>
        </div>}
      
        <div className="col-md-2 border border-danger overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '300px', padding: '10px' }}>
          <h5><b>Share Video</b></h5>
          <form onSubmit={handleUpload}>
            <div className="mb-3">
              <input type='file' accept=".mp4, .mkv .ogg .wmv" onChange={captureFile} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <input
                id="videoTitle"
                type="text"
                ref={videoTitleRef}
                className="form-control"
                placeholder="Title..."
                required
              />
            </div>
            <button type="submit" className="btn btn-danger btn-block btn-sm">Upload Media</button>
          </form>
          {videos.map((video, key) => (
            <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key} >
              <div className="card-title bg-dark">
                <small className="text-white"><b>{video.title}</b></small>
              </div>
              <div>
                <p onClick={() => changeVideo(video.hash, video.title)}>
                  <video
                    src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                    style={{ width: '150px' }}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
