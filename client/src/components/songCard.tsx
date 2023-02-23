export const SongCard = () => {
  const handleClick = () => {
    console.log("Worked");
  };
  return (
    <div className="song-card" onClick={handleClick}>
      <h3>Example Song</h3>
      <span>Created: 12:34 PM</span>
    </div>
  );
};
