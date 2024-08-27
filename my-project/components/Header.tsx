"use client";

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const Header = () => {
    const [data, setData] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'ease-in-out',
        beforeChange: (oldIndex: number, newIndex: number) => setCurrentIndex(newIndex),
    };

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
        <header className="relative overflow-hidden h-screen w-full">
            <Slider {...settings} >
                {data.map((item, index) => (
                    <div key={index} className="relative w-full h-full">
                        <motion.img
                            src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl shadow-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
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
