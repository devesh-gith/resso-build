import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/ShazamCore";

function SongDetails() {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();

  // console.log(songid);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingSongRelated } = useGetSongRelatedQuery({
    songid,
  });
  if (isFetchingSongDetails && isFetchingSongRelated)
    return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  // console.log(data);
  // console.log(activeSong);
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className="mb-18">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        {songData?.sections[1].type === "LYRICS" ? (
          songData?.sections[1]?.text.map((line, i) => (
            <p
              key={`LYRCIS-${line}-${i}`}
              className="text-gray-400 text-base my-1 "
            >
              {line}
            </p>
          ))
        ) : (
          <p>Sorry, No Lyrics Found</p>
        )}
        <div className="mt-5">
          <RelatedSongs
            data={data}
            artistId={artistId}
            isPlaying={isPlaying}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            activeSong={activeSong}
          />
        </div>
      </div>
    </div>
  );
}

export default SongDetails;
