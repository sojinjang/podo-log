import tw from "tailwind-styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const UploadedImg = tw.img`
max-w-[80%] mx-auto
`;

export const ImgUploadContainer = tw.div`
flex bg-[#F0F0F0] w-[65%] h-[35%] mx-auto rounded-xl cursor-pointer
hover:opacity-70 transition duration-500 ease-in-out
`;

export const ImgUploadIcon = tw.img`
w-[15%] m-auto
`;

export const TrashCanIcon = tw.img`
w-[5%] absolute right-[12%] top-[1vh] cursor-pointer
drop-shadow-2xl hover:drop-shadow-none transition ease-in duration-300
`;

export const DiaryForm = tw.form`
h-[80vh] w-[80%] bg-white/60 m-auto rounded-xl mt-[3vh] overflow-y-scroll scrollbar-hide
`;

export const inputStyle = `
font-sans bg-transparent p-4 sm:p-6 w-full
`;

export const TitleInput = tw.input`
text-xl sm:text-2xl font-semibold
`;

export const ContentInput = tw.textarea`
h-[30%] mt-[1vh] text-base sm:text-xl font-medium
`;

export const PostButton = tw.button`
h-[70px] absolute md:right-[2vh] right-[1.8vh] m-auto md:pt-[0.8vh]
font-sans text-[2.3vh] md:text-[1.8vh] cursor-pointer hover:opacity-50
drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;

export const Photo = tw.img`
max-w-[90%] mt-3
`;

export const PhotoSkeleton = tw(Skeleton)`
h-[52vh] mt-3
`;

export const DiaryTitle = tw.p`
mt-2 text-[2.2vh] md:text-[2vh]
whitespace-pre-line break-all
`;

export const DiaryContent = tw.p`
pb-4 md:pb-6 text-[1.8vh] md:text-[1.6vh] 
whitespace-pre-line break-all
`;

export const MoveableStickerContainer = tw.div`
z-10 flex absolute cursor-pointer
`;

export const StickerImg = tw.img`
h-[7vh]
`;

export const CancelImg = tw.img`
h-[2vh] absolute right-0 
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;

export const ProfileImg = tw.img`
w-[40px] h-[40px] min-[390px]:w-[55px] min-[390px]:h-[55px] md:w-[58px] md:h-[58px] 
rounded-full object-cover shadow-lg 
`;

export const Nickname = tw.p`
text-[1.8vh] md:text-[1.7vh]
`;

export const Date = tw.p`
text-gray-1000 text-[1.4vh] md:text-[1.2vh]
`;
