import { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";

import Post from "../components/posts/Post";
import { GetPosts } from "../utils/getPosts";
import PostPopUp from "../components/PostPopUp";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await GetPosts();
      setPosts(data.posts);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex justify-center flex-col-reverse pt-4 h-full min-w-[40rem]">
      <div className="w-1/2 mx-auto h-[90vh] overflow-auto">
        {loading ? (
          <>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              className="mb-3"
            />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={"3rem"}
              className="mb-3"
            />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={"20rem"}
              className="mb-3"
            />
            <div className="flex items-center gap-4">
              <Skeleton variant="rounded" width={"50%"} height={"3rem"} />
              <Skeleton variant="rounded" width={"50%"} height={"3rem"} />
            </div>
          </>
        ) : (
          <>
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </>
        )}

        {posts.length == 0 && (
          <div className="w-full h-[22rem] flex justify-center">
            <div className="h-[200px] w-[200px] relative">
              <img src="/post.gif" alt="post image" />
            </div>
          </div>
        )}
      </div>
      <PostPopUp />
    </div>
  );
};

export default Posts;
