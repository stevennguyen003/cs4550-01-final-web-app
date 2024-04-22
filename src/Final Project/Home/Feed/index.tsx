import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import LoadingEffect from "../../Utilities/LoadingEffect";
import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import axios from "axios";
import * as client from "./client";
import * as userClient from "../../Profile/client";
import "./index.css";
const BASE_API = process.env.REACT_APP_BACKEND_URL;

function Feed() {
  //   const [post, setPost] = useState({
  //     _id: "",
  //     content: "",
  //     image: "",
  //     author: "",
  //     date: "",
  //     likes: [],
  //     comments: [],
  // });
  const defaultProfilePicUrl = "../images/default.jpeg";
  const [newPostContent, setNewPostContent] = useState<string>(" ");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<client.Post[]>([]);
  const [postProfiles, setPostProfiles] = useState<{
    [key: string]: userClient.User;
  }>({});
  const isEditable = true;
  const [profile, setProfile] = useState({
    profilePicture: null,
    _id: "",
    username: "",
  });

  const [comment, setComment] = useState("");
  const onComment = () => {
    setComment("");
  };
  const handlePostContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewPostContent(e.target.value);
  };
  const handlePostSubmit = async () => {
    try {
      // Assuming you have a function to create a new post
      const newPost = await client.createPost({
        _id: "",
        content: newPostContent,
        author: profile._id,
        likes: [],
        comments: [],
        date: new Date(),
      });
      if (selectedImage) {
        await client.uploadImage(newPost._id, selectedImage);
        console.log("Image uploaded successfully");
  
        // Update the post with the image URL
        const updatedPost = await client.findPostById(newPost._id);
        if (updatedPost) {
          newPost.image = updatedPost.image;
        }
      }
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      try {
        const authorProfile = await userClient.findUserById(newPost.author);
        setPostProfiles((prevProfiles) => ({
          ...prevProfiles,
          [newPost._id]: authorProfile,
        }));
      } catch (error) {
        console.error("Error fetching post author:", error);
      }
      setNewPostContent(""); // Clear the post content input field
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const onLike = async (post: client.Post) => {
    profile._id = profile._id.toString();
    try {
      let updatedPost: client.Post;
      if (post.likes.includes(profile._id)) {
        updatedPost = {
          ...post,
          likes: post.likes.filter((id) => id !== profile._id),
        };
      } else {
        updatedPost = { ...post, likes: [...post.likes, profile._id] };
      }
      const response = await client.updatePost(updatedPost._id, updatedPost);
      setPosts((prevPosts) => {
        return prevPosts.map((prevPost) => {
          if (prevPost._id === updatedPost._id) {
            return updatedPost;
          }
          return prevPost;
        });
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await client.findAllPosts();
        console.log("POSTS:", response);
        setPosts(response);
        const profiles: { [key: string]: userClient.User } = {}; // Explicitly define the type of profiles
        for (const post of response) {
          try {
            const authorProfile = await userClient.findUserById(post.author);
            profiles[post._id] = authorProfile;
            console.log("Author Profile:", profiles[post._id].username);
          } catch (error) {
            console.error("Error fetching post author:", error);
          }
        }
        console.log("Profiles:", profiles);
        setPostProfiles(profiles);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userClient.profile();
        console.log(response);
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
          console.log("Profile Picture: ", correctedUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAttachClick = () => {
    // Trigger the file input
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <div className="community-posts-container">
      <h1>Community Posts</h1>
      {/* Write Post Section */}
      <div className="write-post-section">
        <div className="user-profile">
          <img
            src={profile.profilePicture || defaultProfilePicUrl}
            alt=""
            className="profile-image"
          />
        </div>
        <textarea
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={handlePostContentChange}
          className="post-textarea"
        />

        <span onClick={handleAttachClick} className="attach-icon text-gradient">
          &#128206;
        </span>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            setSelectedImage(
              e.target.files && e.target.files[0] ? e.target.files[0] : null
            );
          }}
          style={{ display: "none" }}
        />
        <button
          onClick={handlePostSubmit}
          style={{
            borderRadius: "9999px",
            border: "none",
            backgroundImage:
              "linear-gradient(to bottom right, #3b82f6, #a855f7, #db2777)",
            color: "white",
            textTransform: "uppercase",
            fontWeight: "700",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          className="post-button"
        >
          Post
        </button>
        
      </div>
      {selectedImage && <span className="attached-message text-gradient">Image attached</span>}

      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-header">
            <div className="post-user">
              <Link to={`/Home/profile/${post.author}`}>
                <img
                  src={
                    (postProfiles[post._id as any] as userClient.User)
                      ? `${BASE_API}/${
                          (postProfiles[post._id as any] as userClient.User)
                            .profilePicture
                        }`.replace(/\\/g, "/")
                      : defaultProfilePicUrl
                  }
                  loading="lazy"
                  alt=""
                  className="post-image"
                />
              </Link>
              <Link to={`/Home/profile/${post.author}`}>
                {postProfiles[post._id] && postProfiles[post._id].username && (
                  <p>{"@" + postProfiles[post._id].username}</p>
                )}
              </Link>
              {post.date && (
                <p className="post-date">
                  {new Date(post.date).toISOString().slice(0, 10)}
                </p>
              )}
              {isEditable && <FaEllipsisV className="ms-auto" color="white" />}
            </div>
          </div>
          <Suspense fallback={<LoadingEffect />}>
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && (
                <div className="post-image-container">
                <img
                  src={`${BASE_API}/${post.image}`.replace(/\\/g, "/")}
                  alt=""
                  className="post-image-content"
                />
              </div>
                
              )}
            </div>
          </Suspense>
          <div className="post-stat">
            <span onClick={() => onLike(post)}>
              {post.likes.includes(profile._id) ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
              <span className="stat">
                {" "}
                {post.likes ? post.likes.length : 0}
              </span>
            </span>
            <span onClick={onComment}>
              <FaRegComment />
              <span className="stat">
                {" "}
                {post.comments ? post.comments.length : 0}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
