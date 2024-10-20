import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    
    // Check if the logged-in user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const fetchedPost = await appwriteService.getPost(slug);
                    
                    if (!fetchedPost) {
                        throw new Error("Post not found");
                    }
    
                    setPost(fetchedPost);
    
                    // Fetch the author only if the post has a userId
                    if (fetchedPost.userId) {
                        const user = await authService.getUserById(fetchedPost.userId);
                        setAuthorName(user ? user.name : "Unknown User");
                    } else {
                        setAuthorName("Unknown User");
                    }
                } else {
                    throw new Error("No slug provided");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to fetch post. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchPost();
    }, [slug]);
    

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/"); // Redirect after successful deletion
                } else {
                    alert("Failed to delete post. Please try again.");
                }
            });
        }
    };

    // Loading state
    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    // Error state
    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    // Post display
    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-col md:flex-row mb-6">
                    <div className="md:w-1/3 pr-4 mb-4 md:mb-0">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full h-auto object-cover shadow-lg transition duration-300 transform hover:scale-105"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
                        <p className="text-sm text-gray-600 mb-4">
                            Created by: {authorName || "Unknown User"}
                        </p>
                        <div className="browser-css mb-4">
                            {parse(post.content)}
                        </div>

                        {/* Show edit and delete options only if the user is the author */}
                        {isAuthor ? (
                            <div className="mt-4 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500 dark:bg-green-700">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500 dark:bg-red-700" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        ) : (
                            <div className="mt-4 text-gray-600">
                                Viewing as guest. Login to edit or delete posts.
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="text-center py-8">Post not found.</div> // Fallback if post is null
    );
}
