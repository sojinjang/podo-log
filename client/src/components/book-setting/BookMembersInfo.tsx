import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

import { API_URL } from "src/constants/API_URL";
import { api } from "src/utils/axiosApi/api";
import { BookIdType } from "src/pages/BookSetting";
import MemberProfile from "./MemberProfile";

export interface MemberInfo {
  userId?: number;
  nickname: string;
  profile: string;
  isMe: boolean;
}

export const BookMembersInfo = ({ bookId }: BookIdType) => {
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
    <Container>
      일기장 공유 멤버
      <Divider />
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
    </Container>
  );
};

const Container = tw.div`
font-sans text-[1.7vh] bg-white/60 rounded-lg drop-shadow-lg
mx-auto mb-[1.5vh] w-[90%] md:p-5 p-3
`;

const Divider = tw.hr`
w-full h-[2px] mx-auto mt-1 mb-2 bg-[#C7C7C7]
`;
