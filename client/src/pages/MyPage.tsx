import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/styles/Common";
import { Navbar, PageTitle } from "src/components/common";
import {
  MyInfoSection,
  WithdrawalButton,
  SignOutButton,
  InviteCodeSection,
} from "src/components/my-page";

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
