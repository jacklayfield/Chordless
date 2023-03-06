interface VPROPS {
  handleViewChange: Function;
  view: String;
}

export const ViewMenu: React.FC<VPROPS> = ({ handleViewChange, view }) => {
  return (
    <div className="center-div ">
      <div className="buttons">
        <button
          className={
            view === "standard" ? "viewMenuButton selected" : "viewMenuButton"
          }
          onClick={() => {
            handleViewChange("standard");
          }}
        >
          Standard
        </button>
        <button
          className={
            view === "lgScope" ? "viewMenuButton selected" : "viewMenuButton"
          }
          onClick={() => {
            handleViewChange("lgScope");
          }}
        >
          Large Scope
        </button>
      </div>
    </div>
  );
};
