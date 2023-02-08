import "../styling/theme.css";
import { Guitar } from "../components/guitarComponents/guitar";

export const CreateSong = () => {
  return (
    <div
      style={{
        paddingTop: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Guitar />
    </div>
  );
};
