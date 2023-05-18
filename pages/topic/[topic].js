import { ArticleListItem } from "@/components/ArticleList";
import TopicsList from "@/components/TopicsList";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

export async function getServerSideProps(context) {
  const topic = context.params.topic;
  const q = query(
    collection(db, "posts"),
    where("topicTags", "array-contains", topic)
  );
  const docSnapshot = await getDocs(q);
  const articles = docSnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...data, createdAt: data?.createdAt.toMillis(), id: doc.id };
  });

  return {
    props: {
      articles,
      topic,
    },
  };
}

function Topic({ articles, topic }) {
  const data = {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque itaque dolorum ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sint soluta doloremque tenetur laboriosam deleniti nihil a neque impedit labore?",
    authour: "Nick Schiefer",
  };

  const topicWords = topic.replaceAll("-", " ").split(" ");
  const capitalisedTopic = topicWords.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  });

  return (
    <div className="flex justify-center h-screen px-3 lg:px-2.5 ">
      <div className="bg-white w-full max-w-[1192px] pt-8">
        <h1 className="text-[26px] md:text-[48px] font-bold mb-4 max-w-[900px]">
          Articles in {capitalisedTopic.join(" ")}
        </h1>
        <div className="flex flex-col-reverse xl:flex-row xl:mt-8">
          <ul>
            {articles.map((article) => (
              <Link key={article.id} href={"/"+ article.id}>
                <ArticleListItem  data={article} />
              </Link>
            ))}
          </ul>

          <div className="mb-5 -mt-3">
            <TopicsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topic;
