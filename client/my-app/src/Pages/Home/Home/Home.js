import React from 'react';
import Banner from '../Banner/Banner';
import ServiceInHome from '../ServiceInHome/ServiceInHome';
import { Helmet } from 'react-helmet';

import ReviewsOnHome from '../ReviewsOnHome/ReviewsOnHome';
import Blogs from '../Blogs/Blogs';


const Title = "Home "

const Home = () => {
    return (
        <div className='flex justify-center' >
          <Helmet>
             <title>{ Title }</title>
          </Helmet>
            <div className='w-11/12 md:w-4/5  '> 
            <Banner></Banner>
            <ServiceInHome></ServiceInHome>
            <ReviewsOnHome></ReviewsOnHome>
            <Blogs></Blogs>
            
           

            </div>
            

        </div>
    );
};

export default Home;