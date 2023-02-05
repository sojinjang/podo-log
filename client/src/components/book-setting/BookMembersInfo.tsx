import React from "react";
import tw from "tailwind-styled-components";

const BookMembersInfo = () => {
  return <Container>일기장 공유 멤버</Container>;
};

export default BookMembersInfo;

const Container = tw.div`
font-[notosans] text-[1.5vh] bg-white/60 rounded-lg drop-shadow-lg
mx-auto mb-[1.5vh] w-[90%] p-3
`;
