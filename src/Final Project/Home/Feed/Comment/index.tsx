import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import * as client from "./client";

import "./index.css";
import { BASE_API } from "./client";
import { FiCornerRightUp } from "react-icons/fi";
import * as userClient from "../../../Profile/client";
import * as postClient from "../../Feed/client";

function CommentSection({
  postId,
  onNewCommentAdded,
}: {
  postId: string;
  onNewCommentAdded: () => void;
}) {
  const defaultProfilePicUrl = "../images/default.jpeg";
  const [newComment, setNewComment] = useState("");
  const [profile, setProfile] = useState({
    profilePicture: null,
    _id: "",
    username: "",
  });
  const [commentProfiles, setCommentProfiles] = useState<{
    [key: string]: userClient.User;
  }>({});

  const [comments, setComments] = useState<client.Comment[]>([]);

  const handleCommentEdit = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewComment(e.target.value);
  };
  const onLike = async (comment: client.Comment) => {
    profile._id = profile._id.toString();
    try {
      let updateComment: client.Comment;
      if (comment.likes.includes(profile._id)) {
        updateComment = {
          ...comment,
          likes: comment.likes.filter((id) => id !== profile._id),
        };
      } else {
        updateComment = { ...comment, likes: [...comment.likes, profile._id] };
      }
      const response = await client.updateComment(
        updateComment._id,
        updateComment
      );
      setComments((prevComments) => {
        return prevComments.map((prevComment) => {
          if (prevComment._id === updateComment._id) {
            return updateComment;
          }
          return prevComment;
        });
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const updateComment = await client.createComment({
        _id: "",
        post: postId,
        content: newComment,
        author: profile._id,
        date: new Date(),
        likes: [],
      });
      setComments((prevComments) => [...prevComments, updateComment]);
      if (updateComment) {
        const post = await postClient.findPostById(postId);
        const updatePost = {
          ...post,
          comments: [...post.comments, updateComment._id],
        };
        const updating = await postClient.updatePost(postId, updatePost);
      }
      onNewCommentAdded();
      try {
        const authorProfile = await userClient.findUserById(
          updateComment.author
        );
        setCommentProfiles((prevProfiles) => ({
          ...prevProfiles,
          [updateComment._id]: authorProfile,
        }));
      } catch (error) {
        console.error("Error fetching post author:", error);
      }
      setNewComment(""); // Clear the post content input field
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userClient.profile();
        //console.log(response);
        const formattedDOB = response.dob
          ? new Date(response.dob).toISOString().slice(0, 10)
          : "";
        setProfile({
          ...response,
          dob: formattedDOB,
        });
        if (response.profilePicture) {
          const url = `${BASE_API}/${response.profilePicture}`;
          const correctedUrl = url.replace(/\\/g, "/");
          setProfile({
            ...response,
            profilePicture: correctedUrl,
          });
          //console.log("Profile Picture: ", correctedUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsResponse = await client.findCommentsByPost(postId);

        setComments(commentsResponse);
        // Fetch profiles of users who made comments
        const profiles: { [key: string]: userClient.User } = {};
        for (const cmt of commentsResponse) {
          try {
            const authorProfile = await userClient.findUserById(cmt.author);
            console.log("Author Profile for com:", authorProfile);
            profiles[cmt._id] = authorProfile;
            //console.log("Author Profile:", profiles[comment._id].username);
          } catch (error) {
            console.error("Error fetching post author:", error);
          }
        }
        setCommentProfiles(profiles);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchComments();
  }, []);

  return (
    <div className="comment-section">
      {comments?.map((comment) => (
        <div key={comment._id} className="comment">
          <img
            src={
              commentProfiles[comment._id]
                ? `${BASE_API}/${commentProfiles[comment._id].profilePicture}`
                : defaultProfilePicUrl
            }
            alt="User Avatar"
            className="comment-avatar"
          />
          <div className="comment-content">
            <p className="comment-author">
              @
              {commentProfiles[comment._id]
                ? commentProfiles[comment._id].username
                : "Unknown user"}
            </p>

            <p className="comment-text">{comment.content}</p>

            <div className="comment-details">
              <p className="comment-date">
                {new Date(comment.date).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="comment-likes">
            <span onClick={() => onLike(comment)}>
              {comment.likes.includes(profile._id) ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
              <span className="stat">
                {" "}
                {comment.likes ? comment.likes.length : 0}
              </span>
            </span>
          </div>
        </div>
      ))}
      {profile && profile._id !== "" && (
        <div className="comment-edit d-flex ">
          <img
            src={
              profile.profilePicture
                ? profile.profilePicture
                : defaultProfilePicUrl
            }
            alt="User Logo"
            className="user-profile-picture"
          />
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={handleCommentEdit}
              placeholder="Leave a comment..."
              className="comment-box"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="comment-submit"
            >
              <FiCornerRightUp />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
