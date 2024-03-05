export const ApiConnecting = () => {
  return (
    <div className="p-4">
      <div className="chords">
        <h1>Spinning up backend service...</h1>
        <h3>
          The backend service is spinning up. It was likely made idle due to not
          being used for 5 consecutive minutes. This page will automatically
          refresh until a connection is established.
        </h3>
        <br />
        <h3>
          Note: If this goes on for more than a minute or so it is likely that
          something else is wrong. Please report by emailing: layf100@gmail.com.
        </h3>
        <br />
        <h2>
          See the demo here!
          <a href="https://www.youtube.com/watch?v=N0fiR1U1zzc"> DEMO</a>
        </h2>
      </div>
    </div>
  );
};
