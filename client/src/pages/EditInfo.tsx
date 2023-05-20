import { useLocation } from "react-router-dom";
import Fade from "react-reveal/Fade";

import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import EditNickname from "src/components/edit-info/EditNickname";
import EditPassword from "src/components/edit-info/EditPassword";
import EditProfile from "src/components/edit-info/EditProfile";
import * as G from "src/styles/Common";

const EditInfo = () => {
  const location = useLocation();
  const isLocalLogin = location.state.myInfo.provider === "podo";

  return (
    <G.PinkPurpleBackground className="flex flex-col">
      <BackButton />
      <PageTitle title="내 정보 수정" />
      <G.UnclickableContainer className="m-auto w-[70%] py-[5vh]">
        <Fade top>
          <>
            <EditProfile />
            <EditNickname />
            {isLocalLogin && <EditPassword />}
          </>
        </Fade>
      </G.UnclickableContainer>
    </G.PinkPurpleBackground>
  );
};

export default EditInfo;
