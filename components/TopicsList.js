import Link from "next/link";

function TopicsList() {
  return (
    <div className="xl:ml-10 xl:sticky top-[80px] text-black">
      <h1 className="text-[16px] font-bold mb-4">
        Discover more of what matters to you
      </h1>
      <nav>
        <div className="flex flex-wrap justify-start items-start space-x-2 max-w-[769px]">
          <TopicsListItem name={"Machine Learning"} />
          <TopicsListItem name={"Politics"} />
          <TopicsListItem name={"Technology"} />
          <TopicsListItem name={"Data Science"} />
          <TopicsListItem name={"Writing"} />
          <TopicsListItem name={"Software Engineering"} />
          <TopicsListItem name={"Productivity"} />
          <TopicsListItem name={"Programming"} />
          <TopicsListItem name={"Relationships"} />
        </div>
      </nav>
    </div>
  );
}

export function TopicsListItem({ name }) {

  return (
    <Link href={"/topic/" + name.toLowerCase().replaceAll(" ", "-")}>
    <div className="
    hover:bg-[#d1cdcd] cursor-pointer
    w-fit text-start text-[14px] whitespace-nowrap bg-[#f2f2f2] mb-2 py-2 px-4 rounded-full">
      {name}
    </div>
    </Link>
  );
}

export default TopicsList;
