import { useQuery } from "@tanstack/react-query"

import Post from "../Post"
import { getMyPosts, profileData } from "../../../api/auth.api"

export function MyPosts() {
  const { data: userData } = useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
    select: (res) => res.data.data.user,
  })

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["my-posts"],
    queryFn: () => getMyPosts(userData?.id),
    select: (res) => res.data.data.posts,
    enabled: !!userData?.id,
        staleTime: Infinity

  })

  return <Post data={data} isFetching={isFetching} refetch={refetch} />
}
