interface SPROPS {
  songName: String;
}

export const SongCard: React.FC<SPROPS> = ({ songName }) => {
  return (
    <div className="song-card">
      <h3>{songName}</h3>
    </div>
  );
};
