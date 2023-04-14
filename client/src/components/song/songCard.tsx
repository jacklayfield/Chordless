interface SPROPS {
  songName: String;
}

export const SongCard: React.FC<SPROPS> = ({ songName }) => {
  return (
    <div className="song-card">
      <h3>{songName}</h3>
      <span>Created: 12:34 PM</span>
    </div>
  );
};
