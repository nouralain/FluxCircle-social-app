import { useQuery } from "@tanstack/react-query"
import { getFeedPosts} from "../../../api/auth.api"
import Post from "../Post"

export function FeedPosts() {
   
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getFeedPosts,
    select: (res) => res.data.data.posts,
    staleTime: Infinity
  })
  return <Post data={data} isfetching={isFetching} refetch={refetch} />
}