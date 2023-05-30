import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Menu, Transition } from "@headlessui/react";

import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { isDeleteModalVisibleAtom } from "src/recoil/diary-detail";
import { DeleteInfo, deleteInfoAtom } from "src/recoil/diary-detail/atom";
import menuImg from "../../assets/icons/menu.png";
import dropdownImg from "../../assets/icons/dropdown_menu.png";
import pencilImg from "../../assets/icons/pencil.png";
import trashCanImg from "../../assets/icons/trash-can.png";
import * as S from "src/styles/DiaryDetail";

interface DropdownMenuProps {
  setCommentIsBeingEdited?: (state: boolean) => void;
  deleteInfo: DeleteInfo;
}

const DropdownMenu = ({ setCommentIsBeingEdited, deleteInfo }: DropdownMenuProps) => {
  const navigate = useNavigate();
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

  const dropdownMenuImgSrc = isDropdownActivatied ? dropdownImg : menuImg;

  return (
    <Menu as="div" className="relative my-auto ml-auto">
      <Menu.Button ref={dropdownButtonRef}>
        <S.DropdownMenuIcon onClick={changeDropdownState} src={dropdownMenuImgSrc} />
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
            <S.DropdownBtnContainer
              onClick={() => {
                if (setCommentIsBeingEdited) return setCommentIsBeingEdited(true);
                navigate(PRIVATE_ROUTE.diaryRevision.path.split("/").reverse()[0]);
              }}
            >
              <S.ButtonIconImg src={pencilImg} />
              <S.ButtonDesc>수정</S.ButtonDesc>
            </S.DropdownBtnContainer>
          </Menu.Item>
          <Menu.Item>
            <S.DropdownBtnContainer
              onClick={() => {
                setDeleteInfo(deleteInfo);
                setIsDeleteModalVisible(true);
              }}
            >
              <S.ButtonIconImg src={trashCanImg} />
              <S.ButtonDesc>삭제</S.ButtonDesc>
            </S.DropdownBtnContainer>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
