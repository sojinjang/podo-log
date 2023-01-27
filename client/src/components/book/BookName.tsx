import React from "react";
import tw from "tailwind-styled-components";

import PageTitle from "../common/PageTitle";

const NumMember = tw.div`
font-[jua] text-gray-1000 text-[3vh] md:text-[2.7vh] mx-3 my-auto pt-[1.2vh]
`;

const BookName = () => {
  return (
    <div className="flex justify-center">
      <PageTitle title="울 빼밀리 👨‍👩‍👧‍👧" />
      <NumMember>4</NumMember>
    </div>
  );
};

export default BookName;
