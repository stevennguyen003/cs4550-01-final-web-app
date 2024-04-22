import { FaCheckCircle } from "react-icons/fa";
import React, { useState } from "react";

function CommentSection() {
  const [comment, setComment] = useState("");

  const handleCommentEdit = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(comment); 
    setComment(""); 
  };
  return (
    <div className="comment-section">
      <img src="/img/music.png" alt="User Logo" className="user-logo" />
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentEdit}
          placeholder="Leave a comment..."
          className="comment-write"
        />
        <button type="submit" className="submit-button">
          <FaCheckCircle size={25} />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;