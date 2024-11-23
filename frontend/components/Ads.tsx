import React from 'react';

const Ads = () => {
  return (
    <div id="subscribe" className="container mx-auto xl:max-w-[1180px] flex items-center justify-center pt-[40px] mt-20 mb-20">
      <div className="w-full max-w-[750px] p-6 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 border border-transparent rounded-xl shadow-xl text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl">
        <p className="text-xl font-semibold text-white">
          Stay ahead in the tech world! Subscribe to our newsletter for the latest updates and insights.
        </p>
        <button className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          Subscribe Now
          
        </button>
      </div>
    </div>
  );
};

export default Ads;
