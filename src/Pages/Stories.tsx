import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import StoryPopUp from "../components/storyPopUp";
import { GetStories } from "../utils/getStories";
import Story from "../components/story";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await GetStories();
      setStories(data.stories);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex justify-center max-w-[1000px] mx-auto flex-col pt-4 h-full ">
      <StoryPopUp />

      <div className=" overflow-auto flex justify-between flex-wrap gap-6">
        {loading ? (
          <div className="flex justify-between flex-wrap w-full">
            <Skeleton
              variant="rounded"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <Skeleton
              variant="rounded"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <Skeleton
              variant="rounded"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <Skeleton
              variant="rounded"
              width={200}
              height={200}
              className="rounded-2xl"
            />
          </div>
        ) : (
          <>
            {stories.map((story) => (
              <Story story={story} />
            ))}
          </>
        )}

        {stories.length == 0 && (
          <div className="w-full h-[22rem] flex justify-center">
            <div className="h-[200px] w-[200px] relative">
              <img src="/post.gif" alt="post image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
