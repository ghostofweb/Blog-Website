import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth"; // Import the auth service
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [authorName, setAuthorName] = useState(""); // State to hold author name
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        // Fetch the post data
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // Fetch the user's name using authService
                    authService.getCurrentUser().then((user) => {
                        if (user) {
                            setAuthorName(user.name); // Set the author's name
                        }
                    });
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                } else {
                    alert("Failed to delete post. Please try again.");
                }
            });
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex mb-6">
                    <div className="w-1/3 pr-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full h-auto object-cover" // Make image responsive
                        />
                    </div>
                    <div className="w-2/3">
                        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                        <p className="text-sm text-gray-600 mb-4">
                            Created by: {authorName || 'Unknown User'}
                        </p>
                        <div className="browser-css">
                            {parse(post.content)}
                        </div>
                        {isAuthor && (
                            <div className="mt-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
