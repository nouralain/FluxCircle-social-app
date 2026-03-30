import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../../../api/auth.api"
import Post from "../Post"

export function CommunityPosts() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["AllPosts"],
    queryFn: getAllPosts,
    select: (res) => res.data.data.posts,
        staleTime: Infinity

  })
  return <Post data={data} isFetching={!data && isFetching} refetch={refetch} />
}