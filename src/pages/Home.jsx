import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access authentication state
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData); // Access user data from Redux store

    useEffect(() => {
        if (userData && userData.$id) { // Check if the user is logged in
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    setFilteredPosts(posts.documents);
                }
            });
        }
    }, [userData]); // Fetch posts only when userData changes

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredPosts(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setFilteredPosts(posts);
            setShowSuggestions(false);
        }
    }, [searchQuery, posts]);

    const handleSuggestionClick = (postId) => {
        navigate(`/post/${postId}`);
        setSearchQuery("");
        setShowSuggestions(false);
    };

    // Check if the user is logged in
    if (!userData || !userData.$id) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog!</h1>
                        <p className="text-lg mb-6">
                            Discover a world of amazing stories and insights.
                            Join us to explore a wide range of topics and connect with our community!
                        </p>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search for a blog..."
                                className="border rounded-lg p-2 w-80"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {showSuggestions && (
                                <div className="absolute z-10 bg-white border rounded-lg w-80 shadow-md mt-1">
                                    {filteredPosts.map((post) => (
                                        <div
                                            key={post.$id}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(post.$id)}
                                        >
                                            {post.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-md mb-4">
                            To unlock the full experience, please log in or sign up.
                        </p>
                        <div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => navigate('/login')}>
                                Log In
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-2" onClick={() => navigate('/signup')}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap mb-4'>
                    <div className='p-2 w-full relative'>
                        <input
                            type="text"
                            placeholder="Search for a blog..."
                            className="border rounded-lg p-2 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {showSuggestions && (
                            <div className="absolute z-10 bg-white border rounded-lg w-full shadow-md mt-1">
                                {filteredPosts.map((post) => (
                                    <div
                                        key={post.$id}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(post.$id)}
                                    >
                                        {post.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {filteredPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
