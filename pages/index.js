import ArticleList from "@/components/ArticleList";
import TopicsList from "@/components/TopicsList";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-[#ffc017] w-full text-black flex flex-col justify-center items-center px-6 border-b border-black">
        <header className="max-w-[1192px] w-full">
          <div className="">
            <div className="text-[#080808] py-16">
              <h1 className="text-[88px] leading-[98px]">Stay curious.</h1>

              <div className="mb-[40px]">
                <p className="text-[24px] w-[280px] mt-8 sm:w-[400px] text-[#292929]">
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </p>
              </div>
              <Link href={"#articles"}>
                <button className="hover:bg-black bg-[#191919] text-white px-12 py-2 rounded-full text-[20px]">
                  Start reading
                </button>
              </Link>
            </div>
          </div>
        </header>
      </div>

      <main id="articles" className="w-full flex justify-center items-center px-3 md:px-6">
        <div  className="max-w-[1192px] w-full flex">
          <ArticleList />
        </div>
      </main>
    </>
  );
}
