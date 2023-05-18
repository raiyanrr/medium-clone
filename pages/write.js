import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { useRouter } from "next/router";
import { openSignInModal } from "@/redux/modalSlice";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Write() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [preview, setPreview] = useState(false);
  const [tags, setTags] = useState(["Software Engineering"]);
  const [tagName, setTagName] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const [articleImage, setArticleImage] = useState(null);
  const [articleImageUrl, setArticleImageUrl] = useState("");
  const [authour, setAuthour] = useState("");
  const [loading, setLoading] = useState(false);
  const previewImageRef = useRef(null);
  const articleImgRef = useRef(null);

  async function sendPost() {
    if (!user.uid) {
      dispatch(openSignInModal());
      return;
    }

    const docRef = collection(db, "posts");
    await addDoc(docRef, {
      authour: authour || user.name,
      title: post.title,
      description: post.description,
      content: post.content,
      createdAt: serverTimestamp(),
      uid: user.uid,
      authorProfileLink: "/" + user.name,
      topicTags: tags.map((tag) => tag.toLowerCase().replace(" ", "-")),
      minsToRead: Math.round(post.content.trim().split(" ").length / 200),
    });

    if (previewImage){
      const imaegRef = ref(storage, `articleImages/${docRef.id}`)
      await uploadString(imaegRef, previewImage, "data_url")
      const downloadUrl = await getDownloadURL(imaegRef)
      await updateDoc(doc(db, "posts", docRef.id), {
        previewImage: downloadUrl
      })
    }

    setPost({
      title: "",
      description: "",
      content: "",
    });

    router.push("/");
  }

  function Tag({ name }) {
    return (
      <div
        className="
       cursor-pointer flex items-center space-x-4 
      w-fit text-start text-[14px] whitespace-nowrap bg-[#f2f2f2] mb-2 py-2 px-4 rounded-full"
      >
        <h1>{name}</h1>

        <div onClick={() => setTags((arr) => arr.filter((e) => e !== name))}>
          <XMarkIcon className="w-5 hover:text-red-600" />
        </div>
      </div>
    );
  }

  function addTag(name) {
    if (!name) return;
    if (tags.includes(name)) return;
    setTags([name, ...tags]);
    setTagName("");
  }

  function addImageToPost(e) {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.addEventListener("load", (e) => {
      setPreviewImage(e.target.result);
    });
  }

  function addImageToArticle(e) {
    setLoading(true);
    setArticleImageUrl(false);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.addEventListener("load", (e) => {
      setArticleImage(e.target.result);
    });
    setLoading(false);
  }

  async function uploadArticleImage() {
    setLoading(true);
    const imageRef = ref(storage, `images/${Date.now()}`);
    await uploadString(imageRef, articleImage, "data_url");
    const downloadUrl = await getDownloadURL(imageRef);
    setArticleImageUrl(downloadUrl);
    setArticleImage(null);
    setLoading(false);
  }

  console.log(Math.ceil(post.content.trim().split(" ").length / 200));
  console.log(Math.ceil(post.content.trim().split(" ").length));

  return (
    <div className="flex justify-center h-screen px-3 lg:px-0">
      <div className="bg-white w-full max-w-[1192px] pt-8">
        <div className="flex justify-center mb-8">
          <div>
            <button
              onClick={sendPost}
              disabled={
                !post.title ||
                !post.description ||
                !post.content ||
                !previewImage
              }
              className="px-4 py-2 hover:bg-black bg-green-500 text-white rounded-full mr-2 w-24 disabled:bg-gray-400"
            >
              Publish
            </button>
            <button
              onClick={() => setPreview(!preview)}
              className="px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white rounded-full mr-2 w-24"
            >
              {preview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
        {preview ? (
          <div className="flex justify-center pb-[88px]">
            <div className="w-full max-w-[1192px] pt-8">
              <h1 className="text-[26px] md:text-[48px] font-bold mb-4 max-w-[900px]">
                {post.title}{" "}
              </h1>
              <p className="text-[19px] md:text-xl text-[#757575] font-semibold max-w-[800px]">
                {post.description}
              </p>

              <ReactMarkdown className="prose text-[18px] md:text-[20px] mt-[30px] leading-7">
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="pb-[100px]">
            <div className="flex items-center flex-col mb-2 space-y-2">
              <label className="font-bold text-xl">Title</label>
              <textarea
                value={post.title}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, title: e.target.value }))
                }
                className="font-bold resize-none text-[18px] border px-3 py-1 border-black w-full max-w-[800px]"
              ></textarea>
            </div>

            <div className="flex items-center flex-col mb-4 space-y-3">
              <label className="font-bold text-lg">Description</label>
              <textarea
                value={post.description}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, description: e.target.value }))
                }
                className=" text-lg border px-3 py-2 border-black w-full max-w-[800px] h-[80px] resize-none"
              ></textarea>
            </div>

            <div className="flex items-center flex-col  mb-2 space-y-3">
              <label className="font-bold text-lg">Topic Tags</label>
              <div className="flex space-x-3">
                <input
                  value={tagName}
                  placeholder="e.g Software Engineering"
                  className="px-2 border border-black rounded-full"
                  onChange={(e) => setTagName(e.target.value)}
                ></input>
                <button
                  onClick={() => addTag(tagName)}
                  className="px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white rounded-full mr-2 w-24"
                >
                  Add Tag
                </button>
              </div>
              <div className=" text-lg space-x-2  px-3 py-2 border-black w-full max-w-[800px] flex overflow-auto">
                {tags.map((tag, i) => (
                  <Tag key={i} name={tag} />
                ))}
              </div>
            </div>
            <div className="flex items-center flex-col space-y-3">
              <label className="font-bold text-lg">Content</label>
              <div className="flex flex-col items-center space-y-3">
                <button
                  onClick={() => articleImgRef?.current.click()}
                  className="px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white rounded-full mr-2 w-fit whitespace-nowrap"
                >
                  Upload Image
                </button>

                <div>
                  {articleImage && (
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        className="w-[200px] max-h-[200px] object-contain"
                        src={articleImage}
                      />
                      <button
                        onClick={uploadArticleImage}
                        disabled={loading}
                        className="px-4 py-2 hover:bg-blue-700 bg-red-400 text-white rounded-full mr-2 w-fit whitespace-nowrap"
                      >
                        {loading ? "Uploading..." : "Get Image Link"}
                      </button>
                    </div>
                  )}

                  {articleImageUrl && !loading && (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="max-w-[600px] overflow-autov border border-black rounded-lg p-3">
                        {`![image](${articleImageUrl})`}
                      </div>
                      <h2 className="text-red-500 font-semibold">
                        Copy and paste the URL in the Content textarea to
                        preview image
                      </h2>
                    </div>
                  )}

                  {/* {articleImageUrl} */}
                </div>
                <input
                  onChange={addImageToArticle}
                  type="file"
                  hidden
                  ref={articleImgRef}
                />
              </div>
              <textarea
                value={post.content}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, content: e.target.value }))
                }
                className="overflow-y-scroll border px-5 py-4 border-black w-full max-w-[800px] resize-none h-[360px] sm:h-[500px] max-h-[700px]"
              ></textarea>
            </div>
            <div className="flex items-center flex-col mb-4 space-y-3 mt-8">
              <label className="font-bold text-lg">Article Preview Image</label>
              <button
                onClick={() => previewImageRef?.current?.click()}
                className="px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white rounded-full mr-2 w-fit whitespace-nowrap"
              >
                {previewImage ? "Upload New Photo" : "Upload Photo"}
              </button>
              <input
                onChange={addImageToPost}
                ref={previewImageRef}
                hidden
                type="file"
              />

              {previewImage && (
                <div className="">
                  <img className="max-h-[400px]" src={previewImage} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Write;
