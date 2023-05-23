import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import * as S from "../../styles/Diary";

interface ExistingImgProps {
  imgRef: React.RefObject<HTMLInputElement>;
  ogPicSrc: string;
  saveImgFile: () => void;
  handlePicChanged: () => void;
}
const ExistingImg = ({
  ogPicSrc,
  imgRef,
  saveImgFile,
  handlePicChanged,
}: ExistingImgProps) => {
  const ogPic = ogPicSrc === "없음" ? null : ogPicSrc;

  return (
    <>
      {ogPic ? (
        <div className="relative overflow-auto">
          {ogPic && <S.UploadedImg alt="picture" src={ogPic}></S.UploadedImg>}
          <S.TrashCanIcon
            onClick={() => {
              handlePicChanged();
            }}
            src={trashCanIcon}
          />
        </div>
      ) : (
        <S.ImgUploadContainer onClick={() => imgRef?.current?.click()}>
          <S.ImgUploadIcon alt="upload" src={imgUploadIcon} />
          <input
            className="hidden"
            type="file"
            accept="image/bmp,image/jpeg, image/jpg, image/png, image/heic, image/gif"
            onChange={() => {
              saveImgFile();
              handlePicChanged();
            }}
            ref={imgRef}
          />
        </S.ImgUploadContainer>
      )}
    </>
  );
};

export default ExistingImg;
