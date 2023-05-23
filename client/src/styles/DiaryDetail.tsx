import tw from "tailwind-styled-components";
import Skeleton from "react-loading-skeleton";

export const SingleCommentContainer = tw.div`
mb-2 md:mb-3
`;

export const CommentUpperSection = tw.div`
flex
`;

export const CommentLowerSection = tw.div`
flex mt-1 md:mt-2
`;

export const CommentWriterImg = tw.img`
w-[30px] h-[30px] min-[390px]:w-[38px] min-[390px]:h-[38px] md:w-[48px] md:h-[48px] 
rounded-full object-cover shadow-lg my-auto mr-2 md:mr-3
`;

export const CommentWriter = tw.p`
text-[1.6vh] min-[390px]:text-[1.4vh]
`;

export const CommentDate = tw.p`
text-gray-1000 text-[0.5vh] min-[390px]:text-[0.9vh]  md:text-[1vh]
`;

export const CommentContent = tw.p`
text-[1.6vh] min-[390px]:text-[1.4vh] 
whitespace-pre-line break-all
`;

export const CommentReplyIcon = tw.img`
h-[1.6vh] min-[390px]:h-[1.4vh] ml-2 my-auto cursor-pointer
hover:opacity-50 ease-in duration-300
`;

export const Divider = tw.hr`
h-[2px] bg-[#C7C7C7] mx-auto
`;

export const NumCommentsWrapper = tw.div`
mt-2 md:mt-3 mb-1 md:mb-2 mx-auto text-[1.8vh]
`;

export const WriterProfileSkeleton = tw.div`
w-[30px] h-[30px] min-[390px]:w-[38px] min-[390px]:h-[38px] md:w-[48px] md:h-[48px] 
rounded-full shadow-lg mr-2 md:mr-3 bg-gray-200
`;

export const TextSkeleton = tw(Skeleton)`
h-[1.6vh] min-[390px]:h-[1.4vh]
`;

export const Background = tw.div`
top-0 right-0 bottom-0 left-0 fixed bg-transparent 
`;

export const ModalSection = tw.div`
fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/60 p-[1.5vh]
flex flex-col rounded-lg shadow-lg backdrop-blur text-center w-[31vh]
`;

export const CloseButton = tw.button`
flex flex-end cursor-pointer ml-auto text-[2vh] font-sans 
hover:opacity-50 ease-in duration-200
`;

export const Content = tw.div`
flex flex-col my-[3vh] 
`;

export const ConfirmMsg = tw.p`
font-sans font-bold text-[1.9vh] mx-auto
`;

export const GrapeImg = tw.img`
w-[15vh] mx-auto
`;

export const WarningMsg = tw.p`
font-sans text-[1.7vh] mx-auto
`;

export const DisadvantageDesc = tw.p`
font-sans text-[1.4vh] mx-auto 
`;

export const ButtonContainer = tw.div`
inline-block w-auto 
`;

export const DropdownMenuIcon = tw.img`
w-[15px] h-[15px] min-[390px]:w-[19px] min-[390px]:h-[19px] md:w-[24px] md:h-[24px] 
ml-auto cursor-pointer hover:opacity-50 ease-in duration-300
`;

export const DropdownBtnContainer = tw.div`
flex w-[9vh] py-[0.4vh] px-[1.2vh] cursor-pointer mx-auto
hover:opacity-50 ease-in duration-300 
`;

export const ButtonIconImg = tw.img`
h-[1.7vh] my-auto
`;

export const ButtonDesc = tw.p`
font-sans text-[1.6vh] ml-auto
`;

export const CancelButton = tw.p` 
font-sans w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-grat-1000 hover:opacity-50 ease-in duration-300
`;

export const PostButton = tw.button` 
font-sans w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;

export const CancelImg = tw.img`
h-[2vh] absolute right-0 
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;

export const StckButtonContainer = tw.div`
mb-2 md:mb-4 cursor-pointer hover:opacity-50
drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;

export const StickerIcon = tw.img`
w-[3vh] h-[3vh] m-auto
`;

export const StckButtonDesc = tw.p`
text-[1.5vh] md:text-[1.3vh] text-center m-auto
`;

export const SaveButton = tw.button`
h-[70px] absolute md:right-[2vh] right-[1.8vh] m-auto md:pt-[0.8vh]
font-sans text-[2.3vh] md:text-[1.8vh] cursor-pointer hover:opacity-50
drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;

export const Container = tw.div`
fixed bottom-0 h-[30vh] w-[calc(100vh/16*9)] flex flex-col bg-white/60
backdrop-blur-sm rounded-t-lg p-4 z-10 overflow-y-scroll
`;

export const SectionTitle = tw.p`
font-sans font-bold text-[2.1vh] md:text-[1.9vh]
`;

export const DivisionLine = tw.hr`
h-[2px] bg-[#C7C7C7]
`;

export const StickerPackName = tw.p`
font-sans text-[1.5vh] md:text-[1.4vh] font-semibold my-2 mr-3 cursor-pointer 
hover:opacity-50 drop-shadow-xl hover:drop-shadow-none ease-in duration-300 
`;

export const StickerPreviewContainer = tw.div`
flex flex-wrap justify-start overflow-y-scroll scrollbar-hide
`;

export const StickerPreview = tw.img`
h-[5.5vh] m-3 cursor-pointer
hover:scale-105 transition duration-500 ease-in-out 
`;

export const ExpirationDate = tw.p`
font-sans text-gray-1000 mt-auto ml-auto text-[1.4vh] md:text-[1.2vh]
`;
