import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Menu, Transition } from "@headlessui/react";

import MenuImg from "../../assets/icons/menu.png";
import DropdownImg from "../../assets/icons/dropdown_menu.png";

export const DropdownMenu = () => {
  const [isDropdownActivatied, setIsDropdownActivatied] = useState<boolean>(false);
  const changeDropdownState = () => {
    setIsDropdownActivatied((prev) => !prev);
  };

  const dropdownMenuImgSrc = isDropdownActivatied ? DropdownImg : MenuImg;

  return (
    <Menu as="div" className="ml-auto">
      <Menu.Button>
        <DropdownMenuIcon onClick={changeDropdownState} src={dropdownMenuImgSrc} />
      </Menu.Button>
      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Menu.Items>
          <Menu.Item>
            <div>수정</div>
          </Menu.Item>
          <Menu.Item>
            <div>삭제</div>
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
