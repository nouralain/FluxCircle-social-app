
import PostCard from "./PostCard";
import PostSkeleton from './PostSkeleton';

export default function Post({ data, isFetching }) {
    
  return (
    <>
      {isFetching ? (
        <PostSkeleton />
      ) : (
        data?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </>
  );
}
