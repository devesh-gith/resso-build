import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";
import PlayPause from "./PlayPause";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2 `}
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex flex-1 flex-row justify-center items-center">
      <img
        src={song?.images?.coverart}
        className="w-16 h-16 rounded-lg"
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-lg font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/songs/${song.key}`}>
          <p className="text-base mt-1 text-gray-300">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

function TopPlay() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  // console.log(data);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const topPlays = data?.slice(0, 5);

  // console.log(topPlays);npm run

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 mb-5 flex-1 xl:max-w-[450px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl ">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>

        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {topPlays?.slice(0, 5).map((artist) => (
              <SwiperSlide
                key={artist?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artist?.artists[0].adamid}`}>
                  <img
                    src={artist?.images?.background}
                    alt="Name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default TopPlay;
