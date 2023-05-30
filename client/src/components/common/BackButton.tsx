import { useNavigate } from "react-router-dom";
import arrowBackImg from "../../assets/icons/arrow_back.png";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <img
      alt="back"
      src={arrowBackImg}
      onClick={() => navigate(-1)}
      className="z-10 h-[6.5vh] absolute pt-[1vh] cursor-pointer"
    />
  );
};

export default BackButton;
