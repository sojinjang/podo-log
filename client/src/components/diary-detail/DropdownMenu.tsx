import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { Menu, Transition } from "@headlessui/react";

import MenuImg from "../../assets/icons/menu.png";
import DropdownImg from "../../assets/icons/dropdown_menu.png";
import { isDeleteModalVisibleAtom } from "src/recoil/diary-detail";
import { DeleteInfo, deleteInfoAtom } from "../../recoil/diary-detail/atom";

interface DropdownMenuProps {
  setCommentIsBeingEdited?: (state: boolean) => void;
  deleteInfo: DeleteInfo;
}

export const DropdownMenu = ({ setCommentIsBeingEdited, deleteInfo }: DropdownMenuProps) => {
  const setIsDeleteModalVisible = useSetRecoilState(isDeleteModalVisibleAtom);
  const setDeleteInfo = useSetRecoilState(deleteInfoAtom);
  const [isDropdownActivatied, setIsDropdownActivatied] = useState<boolean>(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(e.target as Node)) {
        setIsDropdownActivatied(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [dropdownButtonRef]);

  const changeDropdownState = () => {
    setIsDropdownActivatied((prev) => !prev);
  };

  const dropdownMenuImgSrc = isDropdownActivatied ? DropdownImg : MenuImg;

  return (
    <Menu as="div" className="relative ml-auto">
      <Menu.Button ref={dropdownButtonRef}>
        <DropdownMenuIcon onClick={changeDropdownState} src={dropdownMenuImgSrc} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Menu.Items className="absolute z-20 right-1 bg-white/60 backdrop-blur-3xl p-1 md:p-3 rounded-xl shadow-lg">
          <Menu.Item>
            <ButtonContainer
              onClick={() => {
                if (setCommentIsBeingEdited) setCommentIsBeingEdited(true);
              }}
            >
              <ButtonIconImg src={require("../../assets/icons/pencil.png")} />
              <ButtonDesc>수정</ButtonDesc>
            </ButtonContainer>
          </Menu.Item>
          <Menu.Item>
            <ButtonContainer
              onClick={() => {
                setDeleteInfo(deleteInfo);
                setIsDeleteModalVisible(true);
              }}
            >
              <ButtonIconImg src={require("../../assets/icons/trash-can.png")} />
              <ButtonDesc>삭제</ButtonDesc>
            </ButtonContainer>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const DropdownMenuIcon = tw.img`
w-[15px] h-[15px] min-[390px]:w-[19px] min-[390px]:h-[19px] md:w-[24px] md:h-[24px] 
ml-auto cursor-pointer hover:opacity-50 ease-in duration-300
`;

const ButtonContainer = tw.div`
flex max-w-[90px] w-[14vw] md:w-[9vw] py-1 px-2 cursor-pointer mx-auto
hover:opacity-50 ease-in duration-300 
`;

const ButtonIconImg = tw.img`
h-[1.5vh] min-[390px]:h-[1.3vh]
my-auto mr-2 md:mr-4
`;

const ButtonDesc = tw.p`
font-[notosans] text-[1.5vh] min-[390px]:text-[1.3vh] ml-auto
`;
