interface SPROPS {
  songName: String;
}

export const SongCard: React.FC<SPROPS> = ({ songName }) => {
  const handleClick = () => {
    console.log("Worked");
  };
  return (
    <div className="song-card" onClick={handleClick}>
      <h3>{songName}</h3>
      <span>Created: 12:34 PM</span>
    </div>
  );
};
