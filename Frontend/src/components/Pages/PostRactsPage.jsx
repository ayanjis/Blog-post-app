import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import LoadingSkeleton from "../Loading_Skeleton/LoadingSkeleton.jsx";
import daysAgo from "../../../util/DaysAgo.js";

export default function PostRactsPage() {
  const params = useParams();
  const [reactorIds, setReactorIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const postRespose = await axios.get(
        `http://localhost:5000/post/reactInfo/${params.id}`
      );
      setReactorIds(postRespose.data.likes);

      // console.log(postRespose.data[0].likes.user.posts?.length());
      // console.log(reactorIds);
      // console.log(postRespose.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div>
      <h1 className="text-2xl underline underline-offset-8 mb-4">
        All Ract on this post is here.
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        {reactorIds?.map((reactorId) => {
          return (
            <div
              key={reactorId._id}
              className="flex justify-center items-center gap-1 bg-[#f1096466] p-2 rounded-lg w-[100px] h-[100px]"
            >
              <NavLink
                to={`/user/userinfo/${reactorId.user._id}`}
                className="text-end select-none text-white text-[15px] flex flex-col justify-center items-center gap-1"
              >
                {reactorId ? (
                  <img
                    src={`${reactorId.user.avatar}`}
                    className="w-[2rem] h-[2rem]"
                  />
                ) : (
                  ""
                )}
                <span>{reactorId.user.userName}</span>
                <span className="text-[10px]">
                  {daysAgo(reactorId.createdAt)}
                </span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
