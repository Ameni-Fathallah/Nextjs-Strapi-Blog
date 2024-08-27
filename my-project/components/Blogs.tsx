'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Blogs = () => {
    const [data, setData] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 blogs
    const limit = 10;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1337/api/blogs?populate=*&pagination[start]=0&pagination[limit]=${limit}`
                );
                const fetchedData = response.data.data;
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleBlogClick = (id: string) => {
        router.push(`/blog/${id}`);
    };

    const loadMoreBlogs = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    return (
        <div className='container mx-auto px-4 xl:px-0 xl:max-w-5xl text-white pb-10'>
            <h1 className='text-4xl font-extrabold mb-8 relative hover:text-blue-400 transition-colors duration-300'>
                Latest Posts

            </h1>
            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                {data.slice(0, visibleCount).map((item: any) => (
                    <div
                        key={item.id}
                        className='bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer'
                        onClick={() => handleBlogClick(item.id)}
                    >
                        <div className='relative w-full h-64 overflow-hidden rounded-lg'>
                            <img
                                src={item.attributes?.image?.data?.attributes?.url
                                    ? `http://localhost:1337${item.attributes.image.data.attributes.url}`
                                    : '/images/default-image.jpg'}
                                alt={item.attributes?.title || 'Blog Image'}
                                className='w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110'
                            />
                        </div>
                        <div className='pt-4'>
                            <h2 className='bg-blue-500/10 inline-block text-blue-500 py-1 px-3 rounded-md text-sm'>
                                {item.attributes?.category || 'Unknown Category'}
                            </h2>
                            <p className='text-xl font-semibold mt-2 hover:text-blue-400 transition-colors'>
                                {item.attributes?.Title || 'Untitled'}
                            </p>
                            <div className='flex items-center gap-4 mt-4 text-gray-400'>
                                <div className='flex items-center gap-2'>
                                    <img
                                        src={item.attributes?.avatar?.data?.attributes?.url
                                            ? `http://localhost:1337${item.attributes.avatar.data.attributes.url}`
                                            : '/images/default_avatar.jpg'}
                                        alt={item.attributes?.author || 'Avatar'}
                                        className='w-10 h-10 rounded-full border-2 border-gray-600'
                                    />
                                    <p className='text-sm'>{item.attributes?.author || 'Unknown Author'}</p>
                                </div>
                                <p className='text-sm'>{item.attributes?.date ? new Date(item.attributes.date).toLocaleDateString() : 'Unknown Date'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < data.length && (
                <div className="text-center mt-12">
                    <button 
                        onClick={loadMoreBlogs}
                        className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Blogs;
