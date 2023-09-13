import { Link } from "react-router-dom";
import { SongCard } from "./songCard";
import { SONG_TYPE } from "../../pages/mySongs";

interface SMPROPS {
  songs: SONG_TYPE[];
}

export const Songs: React.FC<SMPROPS> = ({ songs }) => {
  return (
    <>
      {songs.map((song, i) => {
        return (
          <div className="m-3" key={i}>
            <Link to={`/song/${song.songId}`}>
              <SongCard songName={song.songName} />
            </Link>
          </div>
        );
      })}
    </>
  );
};
