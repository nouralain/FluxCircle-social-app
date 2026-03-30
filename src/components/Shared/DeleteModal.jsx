import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

import { GoAlert } from "react-icons/go";
import MyButton from "./Button";

import useDeletePost from "../../hooks/useDeletePost";

export default function DeleteModal({
  isOpen,
  onClose,
  setOpenDeleteModal,
  post,
}) {
  
const {handleDeletePost,loading}=useDeletePost(setOpenDeleteModal,post)
 
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
        <ModalHeader className="flex items-center gap-2 font-extrabold py-3 border-b border-b-gray-300">
          Confirm action
        </ModalHeader>
        <ModalBody>
          <div className="">
            <div className="flex items-center gap-3 my-4">
              <span className="size-9 bg-red-200 text-red-600 rounded-full flex items-center justify-center">
                <GoAlert />
              </span>

              <div className="text-start">
                <p className="text-sm font-bold">Delete this post?</p>
                <p className="text-xs text-graay-500">
                  This post will be permanently removed from your profile and
                  feed.
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-end gap-3 border-t border-t-gray-300">
          <MyButton
            event={() => setOpenDeleteModal(false)}
            styles={"bg-white border border-gray-300 text-black"}
          >
            Cancel
          </MyButton>
          <MyButton
            isLoading={loading}
            event={handleDeletePost}
            styles={"bg-red-600 text-white hover:bg-red-700"}
          >
            {loading ? "Deleting..." : "Delete post"}
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
