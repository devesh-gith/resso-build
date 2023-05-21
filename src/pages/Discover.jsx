import React from "react";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import {
  useGetSongsByGenreQuery,
} from "../redux/services/ShazamCore";
import { useDispatch, useSelector } from "react-redux";

import { selectGenreListId } from "../redux/features/playerSlice";
function Discover() {
  // const { data, isFetching, error } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const genreTitle = "pop";
  // console.log(data);
  // console.log(activeSong);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  if (isFetching) return <Loader title="Loading Songs...." />;

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Discover;
