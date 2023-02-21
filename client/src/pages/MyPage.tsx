import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import PageTitle from "src/components/common/PageTitle";

const MyPage = () => {
  return (
    <>
      <PinkPurpleBackground>
        <PageTitle title="마이 페이지" />
      </PinkPurpleBackground>
      <Navbar activeMenu="myPage" />
    </>
  );
};

export default MyPage;
