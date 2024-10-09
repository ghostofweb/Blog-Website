import React from 'react';
import service from '../appwrite/config';
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-full mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-40 object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
