export const ApiConnecting = () => {
  return (
    <div className="p-4">
      <div className="chords">
        <h1>Hey there... Sorry about this</h1>
        <h3>
          It is likely you've caught the site when the api was made "idle". This
          page will auto-refresh every 10 seconds until we establish a
          connection. The woes of hosting for free 😭😭
        </h3>
        <br />
        <h3>
          Note: If this goes on for more than a few minutes it is likely that
          something else is wrong.
        </h3>
        <br />
        <h2>
          See the demo here!
          <a href="https://www.youtube.com/watch?v=N0fiR1U1zzc">
            {" "}
            https://www.youtube.com/watch?v=N0fiR1U1zzc
          </a>
        </h2>
      </div>
    </div>
  );
};
