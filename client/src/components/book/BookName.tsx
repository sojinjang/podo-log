import React from "react";
import tw from "tailwind-styled-components";
import { useLocation } from "react-router-dom";

import PageTitle from "../common/PageTitle";

const NumMember = tw.div`
font-[jua] text-gray-1000 text-[3vh] md:text-[2.7vh] mx-3 my-auto pt-[1.2vh]
`;

const BookName = () => {
  const location = useLocation();
  const bookName = location.state.name;
  const numMembers = location.state.numMembers;

  return (
    <div className="flex justify-center">
      <PageTitle title={bookName} />
      <NumMember>{numMembers}</NumMember>
    </div>
  );
};

export default BookName;
