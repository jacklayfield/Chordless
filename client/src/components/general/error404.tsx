import searchguy from "../images/searchguy.png";
import "../styling/error.css";

export const Error404 = () => {
  return (
    <div className="center-div mt-4">
      <img className="img-404" src={searchguy} alt="" />
      <div className="msg-404-container">
        <h4 className="error-404">error</h4>
        <h1 className="code-404">404</h1>
      </div>
      <h4>
        Our experts have searched far and wide and alas, we could not find such
        a page.{" "}
      </h4>
    </div>
  );
};
