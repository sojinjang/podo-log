import { useState, useEffect } from "react";

import { BookInfo, MemberInfo } from "src/@types/response";
import { API_URL } from "src/constants/API_URL";
import { api } from "src/utils/axiosApi/api";
import MemberProfile from "./MemberProfile";
import * as S from "../../styles/BookSetting";

const BookMembersInfo = ({ bookId }: Pick<BookInfo, "bookId">) => {
  const [members, setMembers] = useState<MemberInfo[]>([]);

  const getBookmembers = async () => {
    try {
      const { data } = await api.get(API_URL.members(bookId));
      setMembers(data.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getBookmembers();
  }, []);

  return (
    <S.BookMembersContainer>
      일기장 공유 멤버
      <S.Divider />
      {members.map((member) => {
        return (
          <MemberProfile
            key={member.userId}
            profile={member.profile}
            nickname={member.nickname}
            isMe={member.isMe}
          />
        );
      })}
    </S.BookMembersContainer>
  );
};

export default BookMembersInfo;
