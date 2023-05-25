import guitar_player from "../images/guitar_player.jpg";
import "../styling/theme.css";

export const About = () => {
  return (
    <div className="inner-div">
      <img className="section-img" src={guitar_player} alt="" /> <br />
      <br />
      <span>Chordless has three goals:</span> <br /> <br />
      <span style={{ fontWeight: "bold" }}>
        1. To allow users to create songs without needing to know every chord or
        note(s) they are playing.
      </span>{" "}
      <br />
      <span>
        As a beginner guitarist I found that it difficult to write songs that
        weren't composed of the basic chords I was used to playing. Whenever I
        was experimenting and playing different shapes and patterns across the
        fretboard I would find it to be a huge pain to go from playing to
        looking up the chord and recording it. Even now as a more experienced
        guitar player I still admit I find myself struggling to know certain
        less common shapes and it is certainly inconvenient to have to figure
        out / look them up. Therefore, I have created this app to allow users to
        simply input the shape they've played, and it will automatically save
        that shape complete with its generated chord name / note for future use.
      </span>{" "}
      <br />
      <br />
      <span style={{ fontWeight: "bold" }}>
        2. To create a proper place to write down and keep track of riffs /
        progressions on the fly
      </span>{" "}
      <br />
      <span>
        While awesome options exist for comprehensive songwriting, when it comes
        to small riffs / progressions it becomes clear these products are the
        wrong tool for the job. They bombard you with set up and features you
        don't need while underdelivering on features that would prove helpful in
        the process. This is not so much of a songwriting app as it is a
        sophisticated "note-taking" app for guitarists. Just played a riff you
        like? Effortlessly save and refer to it without having to go through the
        hassle of creating an entire comprehensive song.
      </span>{" "}
      <br />
      <br />
      <span style={{ fontWeight: "bold" }}>
        3. To utilize the "shape" display as opposed to only the chord names or
        tabs.
      </span>{" "}
      <br />
      <span>
        Looking at tabs can make learning new songs slow and daunting,
        especially for begginers. Sometimes breaking things out into steps and
        showing you exactly where to put your fingers on what looks like your
        actual fretboard makes the process a lot less frustrating. That's why
        this view is made available (alongside the others).{" "}
      </span>{" "}
    </div>
  );
};
