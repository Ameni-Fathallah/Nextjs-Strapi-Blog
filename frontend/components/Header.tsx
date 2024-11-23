"use client";

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';// Importing carousel styles
import axios from 'axios';//we use this for fteching data 
import { motion } from 'framer-motion';

const Header = () => {
    //state to store banner data fetched from the API
    const [data, setData] = useState<any[]>([]);
    //to keep the currently active slide index 
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    //Slider settings for the slider 
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true,
        cssEase: 'ease-in-out',
        beforeChange: (oldIndex: number, newIndex: number) => setCurrentIndex(newIndex),//updating the index 
    };



    //Fetch data when the component is mounted 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/banners?populate=*');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <header id="header" className="relative  overflow-hidden h-screen w-full ">
            <Slider {...settings} >
                {data.map((item, index) => (
                    <div key={index} className="relative w-full h-full">
                            <motion.img
                                src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[100vh]  object-cover bg-white mx-auto"  // Fixed width, height, centered, and shadow
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />


                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <motion.h1
                                className="text-4xl sm:text-xl md:text-4xl font-extrabold text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 hover:text-blue-400 transition-colors duration-300"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                            >
                                Your Tech Journey Starts Here
                            </motion.h1>
                            <motion.p
                                className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                            >
                                Discover the latest trends and insights in technology.
                            </motion.p>
                            <a href="#" className="bg-blue-600 text-white py-3 px-6 rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300">
                                Get Started
                            </a>
                        </div>
                    </div>
                ))}
            </Slider>
        </header>
    );
};

export default Header;
