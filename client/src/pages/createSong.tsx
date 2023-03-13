import React from "react";
import "../styling/theme.css";
import { SongBuilder } from "../components/songBuilder";
import { Col, Row } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";
import { useState } from "react";
import CurrentUserContext from "../context/context";

export const CreateSong = () => {
  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;

  const { currentUser, authIsLoading } = React.useContext(CurrentUserContext);
  console.log(currentUser);
  return authIsLoading ? (
    <div>Loading</div>
  ) : (
    <div>
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
              <header className="sectionTitlesText">Create Song</header>
            </div>

            <div style={{ padding: 20 }}>
              <div
                style={{
                  fontSize: "20px",
                }}
              >
                <SongBuilder userFlag={currentUser?.id !== undefined} />
                <div>
                  * Please note that chords with a "~" preceding them denote
                  chords that are not their true form, but are inferred. For
                  example, an "A" chord in its true form would have a muted "low
                  E" (A), but an "A" chord is still inferred from leaving the
                  "low E" open (~A).
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};
