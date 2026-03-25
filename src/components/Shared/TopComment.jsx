import React, { useState } from "react";
import AllComments from './AllComments';

export default function TopComment({ topComment, postId ,commentsCount}) {
  console.log(topComment);
const [allComs , setAllComs]=useState(false)
  return (
 <>
  {allComs ? <AllComments commentsCount={commentsCount} postId={postId}/> :  <div className="border border-gray-300 rounded-2xl bg-graay-200 p-3">
      <div>
        <p className="text-xs font-bold text-graay-500">Top Comment</p>
      </div>
      <div className="content mt-3 flex  gap-5">
         <div className="image size-8 rounded-full overflow-hidden">
                <img src={topComment?.commentCreator.photo} alt={topComment?.commentCreator.name} />
              </div>
              <div className="body">
                <p className="text-xs font-bold ">{topComment?.commentCreator.name}</p>
              <p className="text-sm text-graay-600">{topComment?.content}</p>
              </div>
      </div>
      <div className="link mt-4">
        <button onClick={() => setAllComs(true)} className="text-xs font-bold text text-primary-700 hover:cursor-pointer hover:underline">View all comments</button>
      </div>
    </div>}
 </>
  );
}
