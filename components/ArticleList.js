import { useEffect, useState } from "react";
import TopicsList from "./TopicsList";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setArticles(snapshot.docs);
    });
    console.log(articles.map((a) => a.data()));

    return unsub;
  }, []);

  return (
    <div>
      <div className="hidden xl:inline xl:mb-8 xl:mt-8">
        <h1 className="font-bold text-3xl xl:mt-8">Articles from Medium</h1>
      </div>

      <nav className="flex flex-col-reverse h-full xl:flex-row xl:mt-8">
        <ul className="w-full">
          {articles.map((article) => (
            <Link key={article.id} href={"/" + article.id}>
              <ArticleListItem data={article.data()} />
            </Link>
          ))}
        </ul>
        <div className="h-full mb-8 mt-4">
          <TopicsList />
        </div>
      </nav>
    </div>
  );
}

export function ArticleListItem({ data }) {
  return (
    <div className="flex justify-between w-full md:w-[769px] h-[185px] cursor-pointer">
      <div className="">
        <div className="flex space-x-1 items-center">
          <h2 className="text-xs md:text-sm font-semibold">{data?.authour}</h2>
        </div>
        <div className="w-[240px] sm:w-full">
          <h2 className="font-bold text-sm md:text-lg ">{data?.title}</h2>
          <h3 className="text-gray-400 text-sm md:text-lg max-w-[500px] max-h-[56px] overflow-y-clip">
            {data?.description}
          </h3>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-fit text-start text-[12px] my-2 whitespace-nowrap bg-[#f2f2f2] py-1 px-4 rounded-full">

            <span>{data?.topicTags[0]}</span>
            
          </div>
          <span className="text-[13px] font-semibold text-gray-500">{data?.minsToRead + " min read"}</span>
        </div>
      </div>

      <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[134px] bg-green-400">
        <img
          className="w-full h-full object-cover"
          src={data?.previewImage}
        ></img>
      </div>
    </div>
  );
}

export default ArticleList;
