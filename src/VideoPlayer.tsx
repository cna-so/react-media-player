import "./style.css";
import { useRef, useState } from "react";
import { BsPlay, BsPause } from "react-icons/bs";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { FiMaximize, FiMinimize } from "react-icons/fi";

import { BsPlus } from "react-icons/bs"
import { AiOutlineMinus } from "react-icons/ai"
import { MdOutlineSubtitles } from 'react-icons/md'
const VideoPlayer = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [size, setSize] = useState<"min" | "max">("min");
  const [volume, setVolume] = useState<"high" | "muted">("high");
  const videoRef = useRef();

  return (
    <div className="video-container">
      <div className="header-controllers">
        <div />
        <h1>
          Title
        </h1>
        <div className="subtitle-controllers">
          <BsPlus />
          <AiOutlineMinus />
          <MdOutlineSubtitles />
        </div>

      </div>
      <div className="controllers">
        <div
          className="playPause icon-container"
          onClick={() => setIsPlay(!isPlay)}
        >
          {isPlay ? <BsPlay /> : <BsPause />}
        </div>
        <div>
          <div className={"icon-container"} style={{ minWidth: "max-content" }}>
            <TfiControlForward />
            <TfiControlBackward />
          </div>
        </div>
        <div className={"progress-bar-container"}>
          <p>00:00</p>
          <div className={"bar-container"}>
            <div className={"thumb"} />
          </div>
          <p>10:00</p>
        </div>
        <div className={"bottom-right-controllers"}>
          <div
            className={"size icon-container"}
            onClick={() => setSize(size === "max" ? "min" : "max")}
          >
            {size === "min" ? <FiMinimize /> : <FiMaximize />}
          </div>
          <div
            className={"volume icon-container"}
            onClick={() => setVolume(volume === "high" ? "muted" : "high")}
          >
            {volume === "high" ? <CiVolumeHigh /> : <CiVolumeMute />}
          </div>
        </div>
      </div>
      <video className="video-player" ref={videoRef}>
        <source src={"/video/file1.mp4"} type="video/mp4" />
      </video>
    </div>
  );
};
export default VideoPlayer;
