import "../styling/theme.css";
import { SongBuilder } from "../components/songBuilder";
import { Col, Row } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";

export const CreateSong = () => {
  const { width } = useViewport();
  const breakpoint_small_window = 1500;
  const breakpoint_mobile = 1000;

  return width > breakpoint_mobile ? (
    <div>
      <Row className="gx-0">
        <Col />
        <Col xs={width > breakpoint_small_window ? 8 : 12}>
          <div className="columns">
            <div className="sectionTitles">
              <header className="sectionTitlesText">Create Song</header>
            </div>

            <div style={{ padding: 20 }}>
              <div
                style={{
                  fontSize: "20px",
                }}
              >
                <SongBuilder />{" "}
              </div>
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  ) : (
    <div>
      <Row className="gx-0">
        <Col />
        <Col xs={12}>
          <div className="columns">
            <div className="sectionTitles">
              <header className="sectionTitlesText">Create Song</header>
            </div>

            <div style={{ padding: 20 }}>
              <div
                style={{
                  fontSize: "20px",
                }}
              >
                <text>
                  Mobile Version coming Soon! Please use a window size with a
                  width greater than 1000px for now!
                </text>
              </div>
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};
