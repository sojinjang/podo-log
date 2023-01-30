import ColoredDiaryImg from "../assets/icons/nav-bar/colored_note.png";
import ColoredGrapeImg from "../assets/icons/nav-bar/colored_grape.png";
import ColoredMyPageImg from "../assets/icons/nav-bar/colored_mypage.png";
import GrayDiaryImg from "../assets/icons/nav-bar/gray_note.png";
import GrayGrapeImg from "../assets/icons/nav-bar/gray_grape.png";
import GrayMyPageImg from "../assets/icons/nav-bar/gray_mypage.png";

interface PairObj {
  readonly [key: string]: IconDescPair;
}

interface IconDescPair {
  readonly icon: [string, string];
  readonly description: string;
}

export const ICON_DESC_PAIR_OBJ: PairObj = {
  books: {
    icon: [ColoredDiaryImg, GrayDiaryImg],
    description: "공유일기",
  },
  grape: {
    icon: [ColoredGrapeImg, GrayGrapeImg],
    description: "포도알",
  },
  myPage: {
    icon: [ColoredMyPageImg, GrayMyPageImg],
    description: "마이페이지",
  },
};
