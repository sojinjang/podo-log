import tw from "tailwind-styled-components";

export const GrapeInfoContainer = tw.div`
flex flex-col pt-[8vh] h-[80vh]
`;

export const DescContainer = tw.div`
flex justify-center
`;

export const DescGrape = tw.p`
font-[jua] text-[3vh] text-[#353866]
`;

export const NumGrapeAndGrain = tw.p`
font-[jua] text-[2.5vh] text-[#8687bd] mr-[1vh]
`;

export const GrapeImg = tw.img`
mx-auto drop-shadow-2xl mt-[15vh] w-[25vh] h-[25vh]
`;

export const ContainerWrapper = tw.div`
flex justify-center mx-auto
`;

export const BtnContainer = tw.div`
flex w-[56vh] h-[3vh] justify-center cursor-pointer
drop-shadow-xl hover:drop-shadow-none transition ease-in duration-300
`;

export const BtnIcon = tw.img`
h-[2.5vh] my-auto mr-2
`;

export const BtnDesc = tw.div`
font-[jua] text-[#80A40E] text-[2.3vh] inline
`;

export const GrapeNumContainer = tw.div`
flex justify-end mr-[5vh] mb-[0.5vh] h-[2vh]
`;

export const GrapeIcon = tw.img`
h-[2.2vh] my-auto mr-1.5
`;

export const GrapeNumDesc = tw.div`
font-[jua] text-[#353866] text-[2vh] my-auto
`;

export const PackageName = tw.p`
text-[2.5vh] mx-auto
`;

export const PackageDetailContainer = tw.div`
flex flex-col bg-white/60 rounded-lg shadow-lg 
w-[45vh] h-[74.5vh] mt-[2vh] mx-auto px-[1.5vh] py-[1vh]
`;

export const CancelButton = tw.p`
text-[2vh] p-1 font-sans ml-auto cursor-pointer
drop-shadow-lg hover:drop-shadow-none hover:opacity-50 ease-in duration-300 
`;

export const PodoPriceContainer = tw.div`
flex mx-auto
`;

export const PodoPriceImg = tw.img`
h-[1.5vh] my-auto mr-1.5
`;

export const PodoPrice = tw.p`
text-[1.6vh]
`;

export const StickerImg = tw.img`
h-[6.3vh] w-[6.3vh] mx-[3vh] my-[2vh]
`;

export const ButtonContainer = tw.div`
flex flex-col mt-auto mb-[2.2vh]
`;

export const Announcement = tw.p`
font-sans text-[1.2vh] mx-auto
`;

export const PurchaseBtnDesc = tw.span`
font-sans text-[1.5vh]
`;

export const StickerShopContainer = tw.div`
h-screen py-[2vh]
`;

export const StickerPreviewContainer = tw.div`
flex flex-wrap justify-center p-[0.5vh]
`;

export const PackageListContainer = tw.div`
flex flex-wrap justify-center max-h-[74.5vh] overflow-y-auto scrollbar-hide my-[1.5vh]
`;

export const PackageContainer = tw.div`
w-[22vh] h-[23.3vh] flex flex-col px-[1.5vh] py-[1vh]
m-[1.5vh] bg-white/60 rounded-lg text-[1.7vh] cursor-pointer
shadow-lg hover:shadow-none ease-in duration-300
`;
