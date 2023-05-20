import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import * as S from "../../styles/Diary";

interface NewImgProps {
  imgRef: React.RefObject<HTMLInputElement>;
  diaryImg: string | Blob;
  imgPreview: string | ArrayBuffer | null;
  deleteImgFile: () => void;
  saveImgFile: () => void;
}

const NewImg = ({ diaryImg, imgPreview, deleteImgFile, saveImgFile, imgRef }: NewImgProps) => {
  return (
    <>
      {diaryImg ? (
        <div className="relative overflow-auto">
          <S.UploadedImg src={imgPreview ? imgPreview : imgUploadIcon} />
          <S.TrashCanIcon onClick={deleteImgFile} src={trashCanIcon} />
        </div>
      ) : (
        <S.ImgUploadContainer onClick={() => imgRef?.current?.click()}>
          <S.ImgUploadIcon alt="upload" src={imgUploadIcon} />
          <input
            className="hidden"
            type="file"
            accept="image/bmp,image/jpeg, image/jpg, image/png, image/heic, image/gif"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </S.ImgUploadContainer>
      )}
    </>
  );
};

export default NewImg;
