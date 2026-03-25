import { useQuery } from "@tanstack/react-query"
import Post from "../Post"
import { getMySavedPosts } from "../../../api/auth.api"

export function SavedPosts() {
  const { data,isFetching, refetch } = useQuery({
    queryKey: ["my-saved-posts"],
    queryFn: getMySavedPosts,
    select: (res) => res.data.data.bookmarks,
        staleTime: Infinity

  })
  
  return(
    <>
    {data?.length===0 ? 
     <div className="rounded-2xl border border-gray-200 p-10 mt-4 bg-white text-center"><p className="text-graay-500">No posts yet. Be the first one to publish.</p></div>:
      <Post data={data} isFetching={isFetching} refetch={refetch} />
}
       
    </>

  )
}