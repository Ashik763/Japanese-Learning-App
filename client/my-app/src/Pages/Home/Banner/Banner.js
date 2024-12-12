import React from 'react';
import "./Banner.css";
import img1 from '../../../Assets/banner11-min.jpg'
import img2 from '../../../Assets/banner2-min.jpg'
import img3 from'../../../Assets/bg-img1.jpg';

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row  '>
          <div className='mt-2 md:w-1/3 p-5 '>
            <p className='text-base text-center text-orange-400 '> ABOUT VOYAGE TRAVEL</p>
            <p className='mt-2 text-md text-center md:text-left md:text-3xl md:font-bold md:tracking-tight '> We Provide The Best Experience for You to Explore Nature. </p>
            <p className='font-thin text-sm mt-3 mb-3  '> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            <p className=''> <button className='border  btn btn-outline'> Learn More</button> </p>
          </div>
          <div className=' banner-pic md:w-1/2 rounded-lg relative '>
            <div className='relative md:w-3/4 md:h-3/4  md:pt-3'>
                <img className='banner-img1' src={img1} alt="banner-img    "></img>
                <div className='border absolute bg-white p-5 rounded-lg top-40 md:top-44 '> 
                  <p className=''> Trusted in 25 Country as </p>
                  <p className=' text-bold text-lg text-[#FF6041]  '> The Best Travel Agent</p>
                </div>
            
            
            </div>
          
            <div className='sm:pt-5  md:absolute  md:right-0 md:h-1/2 md:w-1/2 md:top-28 '> 
                <img className='banner-img2 ' src={img2} alt="banner-img"></img>
               
            </div>
           

            
          </div>
          <div className='absolute bg-img'> 
               <img src={img3} ></img>
          </div>
     
        </div>
    );
};

export default Banner;