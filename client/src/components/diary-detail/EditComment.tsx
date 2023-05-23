import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";

import { CommentInput } from "src/@types/diary";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { getComments } from "src/recoil/diary-detail";
import * as G from "src/styles/Common";
import * as S from "src/styles/DiaryDetail";

export interface NewCommentProps {
  parentNickname?: string;
  commentId: number;
  comment: string;
  cancelEdit: () => void;
}

const EditComment = ({ parentNickname, commentId, comment, cancelEdit }: NewCommentProps) => {
  const reloadComments = useSetRecoilState(getComments);
  const { register, handleSubmit } = useForm<CommentInput>({
    defaultValues: { comment: comment },
  });

  const onSubmitComment = async ({ comment }: CommentInput) => {
    try {
      await api.patch(API_URL.comments + `/${commentId}`, { reply: comment });
      reloadComments(1);
      cancelEdit();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <Fade>
      <>
        {parentNickname && (
          <div className="flex text-[1.5vh] min-[390px]:text-[1.3vh]">
            <div className="font-sans font-bold">{parentNickname}</div>
            <div className="font-sans">님에게 답글 남기는중</div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmitComment)}>
          <G.InputContainer className="flex-row w-full mt-0 shadow-lg">
            <G.Input
              className="font-sans w-[90%]"
              placeholder="댓글을 입력해주세요. (최대 150자)"
              minLength={1}
              maxLength={150}
              required
              {...register("comment")}
            />
            <S.CancelButton onClick={cancelEdit}>취소</S.CancelButton>
            <S.PostButton>수정</S.PostButton>
          </G.InputContainer>
        </form>
      </>
    </Fade>
  );
};

export default EditComment;
