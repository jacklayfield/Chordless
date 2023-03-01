import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const SingleSong = () => {
  const location = useLocation();
  const songid = location.pathname.split("/")[2];

  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<String>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        // WE WILL ALSO NEED TO FETCH CHORDS!
        const res = await axios.get(
          "/api/songs/singleSong/id=" + String(songid)
        );
        setSong(res.data.name);
      } catch (error) {
        setError(true);
        console.log(`${(error as AxiosError)?.response?.data}`);
        if (
          `${(error as AxiosError)?.response?.data}` ==
          "user not permitted to view song"
        ) {
          console.error(error);
        }
      }
      setLoading(false);
    };
    fetchSong();
  }, []);

  return !error ? (
    <div>{song}</div>
  ) : (
    <div>Sorry, this song either doesn't exist or doesn't belong to you!</div>
  );
};
