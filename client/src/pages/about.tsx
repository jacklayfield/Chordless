import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import guitar_player from "../guitar_player.jpg";

export const About = () => {
  return (
    <div>
      <Row className="gx-0">
        <Col />
        <Col xs={8}>
          <div className="columns">
            <div className="sectionTitles">
              <header className="sectionTitlesText">What is Chordless?</header>
            </div>

            <div style={{ padding: 20 }}>
              <Row>
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <img className="sectionImg" src={guitar_player} alt="" />{" "}
                  <br />
                  <br />
                  <span>Chordless has two goals:</span> <br /> <br />
                  <span style={{ fontWeight: "bold" }}>
                    1. To allow users to create songs without needing to know
                    every chord or shape they are playing
                  </span>{" "}
                  <br />
                  <span>
                    As a beginner guitarist I found that it difficult to write
                    songs that weren't composed of the basic chords I had
                    learned and was used to playing. Whenever I was
                    experimenting and playing different shapes and patterns
                    across the fretboard I would find it hard to be able to
                    easily record what I was playing. Even now as a more
                    experienced guitar player I still admit I find myself
                    struggling to know certain less common shapes and it is a
                    pain to have to look them up and write them down. Therefore,
                    I have created this app to allow users to simply input the
                    exact strings and frets they've played, and it will
                    automatically save that shape and it's name for future use.
                  </span>{" "}
                  <br />
                  <br />
                  <span style={{ fontWeight: "bold" }}>
                    2. To create a place to write and save songs
                  </span>{" "}
                  <br />
                  <span>
                    There are not a lot of good free options out there desinged
                    to help guitarists write and save songs. After talking with
                    other guitarists I found they echoed my same desire for a
                    simple tool to write and store songs that can not only be
                    easily accessed but also updated when so desired. I have
                    designed this app with the intention of providing an easy
                    and clean way of creating, updating, and viewing songs to
                    fit this need.
                  </span>{" "}
                </div>
              </Row>
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};
