import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Test() {
  const songNotif = () =>
    toast.success("Song has been created!", {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  return (
    <div>
      <div className="songOptions">
        <div>{songNotif()}</div>
        <div>Hi</div>
      </div>
    </div>
  );
}
