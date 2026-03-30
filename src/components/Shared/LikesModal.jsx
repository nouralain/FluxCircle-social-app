import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { LuUsers } from "react-icons/lu";
import { getPostLikes } from "../../api/auth.api";
import { NavLink } from "react-router-dom";
import MyButton from "./Button";
import {  useState } from "react";
import usePagination from "../../hooks/usePagination";

export default function LikesModal({ isOpen, onClose, postId }) {
  const [page, setIncPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["likes-list", postId, page],
    queryFn: () => getPostLikes(postId, page),
    select: (res) => res?.data,
    placeholderData: (previousData) => previousData,
  });
  const { items: likes } = usePagination(data?.data, "likes", page);

  return (
    <Modal
      scrollBehavior="inside"
      size="md"
      classNames={{
        closeButton: "top-3 right-2 text-lg hover:cursor-pointer ",
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-2 font-extrabold py-3 border-b border-b-gray-200">
          <LuUsers color="blue" />
          People who reacted
        </ModalHeader>
        <ModalBody>
          {isLoading ? (
            <span className="py-4 text-center text-graay-500 font-semibold text-sm">
              Loading likes...
            </span>
          ) : (
            <div className="">
              {likes.map((like) => (
                <NavLink
                  key={like._id}
                  className="flex items-center gap-3 mb-4 hover:bg-graay-300 px-3 py-2 rounded-xl"
                >
                  <div className="size-10 rounded-full overflow-hidden">
                    <img
                      src={like.photo}
                      alt={like.name}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="text-start">
                    <p className="text-sm font-bold">{like.name}</p>
                    <p className="text-xs text-graay-500">@{like.username}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {data?.meta.pagination.total > 20 && (
            <MyButton
              isLoading={isFetching}
              event={() => {
                setIncPage(page + 1);
              }}
              styles={
                "text-sm font-bold text-graay-600 w-full bg-white border border-gray-300"
              }
            >
              Load more
            </MyButton>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
