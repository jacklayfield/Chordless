interface OPROPS {
  confirmFunction: Function;
  cancelFunction: Function;
  confirmText: String;
  cancelText: String;
}

export const OptionsMenu: React.FC<OPROPS> = ({
  confirmFunction,
  cancelFunction,
  confirmText,
  cancelText,
}) => {
  return (
    <div className="flex-container">
      {" "}
      <div
        className="chordless-btn edit-chords m-4"
        onClick={() => confirmFunction()}
      >
        <div className="song-options-save">
          {" "}
          <i className="fa-solid fa-floppy-disk fa-lg"></i> {confirmText}
        </div>
      </div>
      <div
        className="chordless-btn edit-chords m-4"
        onClick={() => cancelFunction()}
      >
        <div className="song-options-cancel">
          {" "}
          <i className="fa-solid fa-xmark fa-lg"></i> {cancelText}
        </div>
      </div>
    </div>
  );
};
