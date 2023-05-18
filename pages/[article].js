import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

export async function getStaticProps({ params }) {
  const { article } = params;
  const docSnap = await getDoc(doc(db, "posts", article));
  const data = docSnap.data();
  const formattedData = {
    ...data,
    createdAt: data?.createdAt.toMillis(),
  };

  return {
    props: {
      post: formattedData,
      revalidate: 1000,
    },
  };
}

export async function getStaticPaths() {
  const q = query(collection(db, "posts"));
  const snapshot = await getDocs(q);
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { article: doc.id },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

function Article({ post }) {
  return (
    <div className="flex justify-center h-screen px-4 xl:px-0 ">
      <div className="bg-white w-full max-w-[1192px] pt-8">
        <h1 className="text-[26px] md:text-[48px] font-bold mb-4 max-w-[900px]">
          {post?.title}{" "}
        </h1>
        <p className="text-[19px] md:text-xl text-[#757575] font-semibold max-w-[800px]">
          {post?.description}
        </p>
        <div className="flex items-center space-x-3 ">
          <p className="mt-3 font-bold">{"Written by " + post?.authour}</p>
          <p className="mt-3 text-gray-500"><Moment format="Do MMMM yyyy">{post?.createdAt}</Moment></p>
        </div>

        <ReactMarkdown className="prose text-[18px] md:text-[20px] mt-[30px] pb-[200px] leading-7">
          {post?.content}
        </ReactMarkdown>
      </div>
      <div className="h-[200px]"></div>
    </div>
  );
}

export default Article;
