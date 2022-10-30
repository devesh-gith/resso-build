import React from "react";
import SongBar from "./SongBar";

function RelatedSongs({
  data,
  activeSong,
  handlePause,
  artistId,
  handlePlay,
  isPlaying,
}) {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-3xl text-white">Related Song:</p>

      <div className="flex flex-col mt-6 w-full">
        {data?.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedSongs;
