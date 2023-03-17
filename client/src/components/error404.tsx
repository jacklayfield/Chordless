import searchguy from "../searchguy.png";

export const Error404 = () => {
  return (
    <div className="center-div mt-4">
      <img className="img404" src={searchguy} alt="" />
      <div className="msg404Container">
        <h4 className="error404">error</h4>
        <h1 className="code404">404</h1>
      </div>
      <h4>
        Our experts have searched far and wide and alas, we could not find such
        a page.{" "}
      </h4>
    </div>
  );
};
