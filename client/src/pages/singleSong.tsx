import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CHORD_TYPE } from "../components/songBuilder";
import { Song } from "../components/song";
import { Row, Col } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";
import { ViewMenu } from "../components/viewMenu";

export const SingleSong = () => {
  const location = useLocation();
  const songid = location.pathname.split("/")[2];

  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<String>();
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [view, setView] = useState<String>("standard");

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

  const handleViewChange = (view: String) => {
    view === "standard" ? setView("standard") : setView("lgScope");
  };

  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;

  return !error && !loading ? (
    <div>
      <ViewMenu handleViewChange={handleViewChange} view={view} />
      {view === "standard" ? (
        <Row className="gx-0">
          <Col />
          <Col
            xs={
              width > breakpoint_mid_window
                ? 8
                : width > breakpoint_small_window
                ? 10
                : 12
            }
          >
            <div className="columns">
              <div className="sectionTitles">
                <header className="sectionTitlesText">{song}</header>
              </div>

              <div style={{ padding: 20 }}>
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {view}
                  <Song chords={chords} miniFlag={view === "lgScope"} />
                </div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      ) : (
        <div>
          <Song chords={chords} miniFlag={view === "lgScope"} />
        </div>
      )}
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
