import searchguy from "../../images/searchguy.png";
import "../../styling/error.css";

interface EPROPS {
  errType: number;
}

export const ErrorView: React.FC<EPROPS> = ({ errType }) => {
  console.log(errType);
  if (errType === 404) {
    return (
      <div className="center-div mt-4">
        <img className="img-404" src={searchguy} alt="" />
        <div className="msg-404-container">
          <h4 className="error-404">error</h4>
          <h1 className="code-404">404</h1>
        </div>
        <h4>
          Our experts have searched far and wide and alas, we could not find
          such a page.{" "}
        </h4>
      </div>
    );
  } else if (errType === 403) {
    return (
      <div className="center-div mt-4">
        <h4>
          You are not allowed to view this! It is possible you've been logged
          out...{" "}
        </h4>
      </div>
    );
  } else {
    return (
      <div className="center-div mt-4">
        <h4>Hmmm Something went wrong...</h4>
      </div>
    );
  }
};
