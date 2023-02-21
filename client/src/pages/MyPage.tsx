import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import PageTitle from "src/components/common/PageTitle";
import { MyInfoSection } from "src/components/my-page/MyInfoSection";
import WithdrawalButton from "src/components/my-page/WithdrawalButton";
import SignOutButton from "../components/my-page/SignOutButton";
import { InviteCodeSection } from "../components/my-page/InviteCodeSection";

const MyPage = () => {
  return (
    <PinkPurpleBackground className="flex flex-col">
      <PageTitle title="마이 페이지" />
      <MyInfoSection />
      <InviteCodeSection />
      <SignOutButton />
      <WithdrawalButton />
      <Navbar activeMenu="myPage" />
    </PinkPurpleBackground>
  );
};

export default MyPage;
