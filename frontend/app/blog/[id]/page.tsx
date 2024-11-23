import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { htmlToText } from 'html-to-text';

async function fetchBlog(id: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
  };

  try {
    const res = await fetch(`http://127.0.0.1:1337/api/blogs/${id}?populate=*`, options);
    if (!res.ok) {
      throw new Error('Failed to fetch blog');
    }
    const response = await res.json();
    return response;
  } catch (err) {
    console.error('Error fetching blog:', err);
    return null;
  }
}

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const blog = await fetchBlog(params.id);

  if (!blog || !blog.data) {
    return <p className='text-center text-red-500'>Failed to load blog content.</p>;
  }

  const imageUrl = blog.data.attributes.image?.data?.attributes?.url
    ? `http://127.0.0.1:1337${blog.data.attributes.image.data.attributes.url}`
    : '/images/default.jpg';

  const avatarUrl = blog.data.attributes.avatar?.data?.attributes?.url
    ? `http://127.0.0.1:1337${blog.data.attributes.avatar.data.attributes.url}`
    : '/images/default-avatar.jpg';

  const plainDescription = htmlToText(blog.data.attributes.description || '', {
    wordwrap: 130
  });

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <Link href="/" passHref>
        <span className='text-blue-500 hover:underline cursor-pointer'>{"< Back"}</span>
      </Link>
      <div className='relative w-full h-96 mt-4'>
        <Image
          src={imageUrl}
          alt={blog.data.attributes.Title || "Blog Image"}
          fill
          className="object-cover rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className='mt-6'>
        <h1 className='text-4xl font-bold mb-4'>{blog.data.attributes.Title || "Title Unavailable"}</h1>
        <p className='text-gray-700 mb-4'>{plainDescription}</p>
        <div className='flex items-center gap-3 mb-6'>
          <Image
            src={avatarUrl}
            alt={blog.data.attributes.author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className='font-medium'>{blog.data.attributes.author}</p>
            <p className='text-sm text-gray-500'>{new Date(blog.data.attributes.date).toLocaleDateString()}</p>
            <span className='text-sm text-blue-500'>{blog.data.attributes.category}</span>
          </div>
        </div>
        <br/>
        <div className='text-center'>
          <Link href="/" passHref>
            <button className='bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out'>
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
