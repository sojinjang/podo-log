interface TitleProps {
  readonly title: string;
}

const PageTitle = ({ title }: TitleProps) => {
  return (
    <div className="flex h-[7.5vh]">
      <div className="font-[jua] text-[2.7vh] m-auto pt-[1vh]">{title}</div>
    </div>
  );
};

export default PageTitle;
