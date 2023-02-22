import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import { UnclickableContainer } from "src/components/common/UnclickableContainer";
import EditNickname from "../components/edit-info/EditNickname";
import EditPassword from "../components/edit-info/EditPassword";
import EditProfile from "src/components/edit-info/EditProfile";

const EditInfo = () => {
  return (
    <PinkPurpleBackground className="flex flex-col">
      <BackButton />
      <PageTitle title="내 정보 수정" />
      <UnclickableContainer className="m-auto w-[70%] py-[5vh]">
        <EditProfile />
        <EditNickname />
        <EditPassword />
      </UnclickableContainer>
    </PinkPurpleBackground>
  );
};

export default EditInfo;
