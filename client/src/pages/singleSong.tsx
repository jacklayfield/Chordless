import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CHORD_TYPE } from "../components/songBuilder";

export const SingleSong = () => {
  const location = useLocation();
  const songid = location.pathname.split("/")[2];

  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<String>();
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        // WE WILL ALSO NEED TO FETCH CHORDS!
        const resSong = await axios.get(
          "/api/songs/singleSong/id=" + String(songid)
        );
        setSong(resSong.data.name);

        const resChords = await axios.get(
          "/api/songs/allChords/id=" + String(songid)
        );

        let dbChords: CHORD_TYPE[] = [];

        for (const chord of resChords.data) {
          let chordObj: CHORD_TYPE = {
            chordArr: chord.chordNotes,
            chordName: chord.chordName,
          };
          dbChords.push(chordObj);
        }
        setChords(dbChords);
      } catch (error) {
        setError(true);
        console.log(`${(error as AxiosError)?.response?.data}`);
        if (
          `${(error as AxiosError)?.response?.data}` ===
          "user not permitted to view song"
        ) {
          console.error(error);
        }
      }
      setLoading(false);
    };
    fetchSong();
  }, [songid]);

  return !error && !loading ? (
    <div>
      {chords[0].chordArr}
      <br />
      {song}
    </div>
  ) : (
    <div>
      {!loading ? (
        <div>
          Sorry, this song either doesn't exist or doesn't belong to you!
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
