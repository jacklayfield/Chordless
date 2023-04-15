import "../../styling/viewMenu.css";

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
            view === "standard"
              ? "view-menu-button selected"
              : "view-menu-button"
          }
          onClick={() => {
            handleViewChange("standard");
          }}
        >
          Standard
        </button>
        <button
          className={
            view === "lgScope"
              ? "view-menu-button selected"
              : "view-menu-button"
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
