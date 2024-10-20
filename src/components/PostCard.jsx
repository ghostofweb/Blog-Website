import React from 'react';
import service from '../appwrite/config';
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="transition-transform transform hover:scale-105">
            <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className='w-full flex justify-center mb-4'>
                    <img 
                        src={service.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='rounded-xl w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110' 
                    />
                </div>
                <div className="p-4">
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white truncate'>{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
