import "./style.css";
import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { BsPlay, BsPause } from "react-icons/bs";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { BsPlus } from "react-icons/bs"
import { AiOutlineMinus } from "react-icons/ai"
import { MdOutlineSubtitles } from 'react-icons/md'

const VideoPlayer = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [totalTime, setTotalTime] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [size, setSize] = useState<"min" | "max">("min");
  const [volume, setVolume] = useState<"high" | "muted">("high");
  const videoRef = useRef<HTMLVideoElement>();

  const togglePlay = () => {
    videoRef.current && (isPlay ? videoRef.current.pause() : videoRef.current.play())
    setIsPlay(!isPlay)
  }
  const skip = () => {
    videoRef.current.currentTime += 5
  }
  const backward = () => {
    videoRef.current.currentTime >= 5 && (videoRef.current.currentTime -= 5)
  }
  const toggleMute = () => {
    if (volume === "high") {
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
      setVolume("muted")
      return
    }
    videoRef.current.volume = 1;
    videoRef.current.muted = false;
    setVolume("high")

  }
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  })
  function formatDuration(time: any) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`
    }
  }

  const CalcTotalTime = () => {
    setTotalTime(formatDuration(videoRef.current.duration))
  }
  const CalcCurrentTime = () => {
    setCurrentTime(formatDuration(videoRef.current.currentTime))
  }
  const timelineContainer = useRef<HTMLDivElement>()

  function handleTimelineUpdate(e: any) {
    const rect = timelineContainer.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    // const previewImgNumber = Math.max(
    //   1,
    //   Math.floor((percent * videoRef.current.duration) / 10)
    // )
    // const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`
    // previewImg.src = previewImgSrc
    const pe = videoRef.current.currentTime / videoRef.current.duration
    timelineContainer.current.style.setProperty("--progress-position", (pe).toString())
    // if (isScrubbing) {
    // e.preventDefault()
    // thumbnailImg.src = previewImgSrc
    // timelineContainer.style.setProperty("--progress-position", percent)
    // }
  }



  useEffect(() => {

  }, [videoRef])

  return (
    <div className={`video-container ${size}`}   >
      {!isPlay ? <BsPause className="middle-play" onClick={togglePlay} />
        : <BsPlay size={35} className="middle-play" onClick={togglePlay} />
      } <div className="header-controllers">
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
          {!isPlay ? <BsPlay onClick={togglePlay} /> : <BsPause onClick={togglePlay} />}
        </div>
        <div>
          <div className={"icon-container"} style={{ minWidth: "max-content" }}>
            <TfiControlForward onClick={skip} />
            <TfiControlBackward onClick={backward} />
          </div>
        </div>
        <div className={"progress-bar-container timeline-container"} ref={timelineContainer} >
          <p>{currentTime}</p>
          <div className={"bar-container"}>
            <div className={"thumb"} />
          </div>
          <p>{totalTime}</p>
        </div>
        <div className={"bottom-right-controllers"}>
          <div
            className={"size icon-container"}
            onClick={() => setSize(size === "max" ? "min" : "max")}
          >
            {size === "max" ? <FiMinimize onClick={() => setSize("min")} /> : <FiMaximize onClick={() => setSize("max")} />}
          </div>
          <div
            className={"volume icon-container"}
            onClick={() => setVolume(volume === "high" ? "muted" : "high")}
          >
            {volume === "high" ? <CiVolumeHigh onClick={toggleMute} /> : <CiVolumeMute onClick={toggleMute} />}
          </div>
        </div>
      </div>
      <video className="video-player" ref={videoRef} onLoadedData={() => {
        CalcCurrentTime()
        CalcTotalTime()
      }}
        onTimeUpdate={(event) => {

          handleTimelineUpdate(event)
        }} >
        <source src={"/video/file1.mp4"} type="video/mp4" />
      </video>
    </div>
  );
};
export default VideoPlayer;
