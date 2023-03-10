import React from "react";
import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import PageTitle from "src/components/common/PageTitle";
import { MyInfoSection } from "src/components/my-page/MyInfoSection";
import WithdrawalButton from "src/components/my-page/WithdrawalButton";
import SignOutButton from "../components/my-page/SignOutButton";
import { InviteCodeSection } from "../components/my-page/InviteCodeSection";

const MyPage = () => {
  return (
    <PinkPurpleBackground>
      <PageTitle title="마이 페이지" />
      <Fade top>
        <div className="flex flex-col">
          <MyInfoSection />
          <InviteCodeSection />
          <SignOutButton />
          <WithdrawalButton />
        </div>
      </Fade>
      <Navbar activeMenu="myPage" />
    </PinkPurpleBackground>
  );
};

export default MyPage;
