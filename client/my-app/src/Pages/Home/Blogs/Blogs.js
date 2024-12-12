import React from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';


const Blogs = () => {
  return (
    <PhotoProvider>
    <div>
      <div>
        <div className="m-5 flex ">
          <p className=" text-[#FF6041] tracking-widest"> Latest Blogs </p>{" "}
          <p className="grow border-b-2 border-black "></p>
        </div>
      </div>
      <div>
        <div className=" mt-5  flex flex-col md:flex-row md:justify-around  ">
        
        
          <div className=" hover:shadow-lg dark:hover:shadow-black/30  md:w-3/12 m-3   ">
            <div className="card  bg-base-100 shadow-xl">
            <PhotoProvider>
            <figure className="border w-full p-3">
                <PhotoView src="https://img.freepik.com/free-photo/person-standing-field-surrounded-by-sea-rocks-covered-snow-iceland_181624-13793.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=sph">
                <img
                  className="w-full h-[16rem] object-cover "
                  src="https://img.freepik.com/free-photo/person-standing-field-surrounded-by-sea-rocks-covered-snow-iceland_181624-13793.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=sph"
                  alt="img"
                />

                </PhotoView>
              
              </figure>  
                </PhotoProvider>
           
              <div className="card-body h-[10rem]">
               
                <p className="font-bold">Secrets Of The Ring Road: Iceland’s Epic Road Trip</p>
                <div className="card-actions border-t-2 ">
                        <span className=" text-xs font-thin " > Ashik Ghosh  January 19, 2023 </span>
                </div>
              </div>
            </div>
          </div>

          <div className="  md:w-3/12 m-3 hover:shadow-lg dark:hover:shadow-black/30   ">
            <div className="card  bg-base-100 shadow-xl">
             
              <figure className="border w-full p-3">
                <PhotoView src="https://img.freepik.com/free-photo/happy-hipster-company-friends-traveling-around-world_285396-3653.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=ais">
                <img
                  className="w-full h-[16rem] object-cover "
                  src="https://img.freepik.com/free-photo/happy-hipster-company-friends-traveling-around-world_285396-3653.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=ais"
                  alt="img"
                />

                </PhotoView>
              
              </figure>  
              <div className="card-body h-[10rem]">
               
                <p className="font-bold">Stop Waiting For The Perfect Time To Travel</p>
                <div className="card-actions border-t-2 ">
                        <span className=" text-xs font-thin " > Albert Einstein  February 01, 2023 </span>
                </div>
              </div>
            </div>
          </div>

          <div className="  md:w-3/12 m-3 hover:shadow-lg dark:hover:shadow-black/30   ">
            <div className="card  bg-base-100 shadow-xl">
             
              <figure className="border w-full p-3">
                <PhotoView src="https://img.freepik.com/free-photo/exotic-wild-plants-growing-red-rocks-tatacoa-desert-colombia_181624-9616.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=sph">
                <img
                  className="w-full h-[16rem] object-cover "
                  src="https://img.freepik.com/free-photo/exotic-wild-plants-growing-red-rocks-tatacoa-desert-colombia_181624-9616.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=sph"
                  alt="img"
                />

                </PhotoView>
              
              </figure>  
              <div className="card-body h-[10rem]">
               
                <p className="font-bold">Visiting The Hidden Mayan Ruins Of Calakmul In Mexico</p>
                <div className="card-actions border-t-2 ">
                        <span className=" text-xs font-thin " > Nicola Tesla  April 15, 2023 </span>
                </div>
              </div>
            </div>
          </div>
          <div className="  md:w-3/12 m-3 hover:shadow-lg dark:hover:shadow-black/30   ">
            <div className="card  bg-base-100 shadow-xl">
             
              <figure className="border w-full p-3">
                <PhotoView src="https://img.freepik.com/free-photo/two-tourist-male-woman-with-backpacks-stand-top-crag-enjoying-sunrise_146671-15543.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=ais">
                <img
                  className="w-full h-[16rem] object-cover "
                  src="https://img.freepik.com/free-photo/two-tourist-male-woman-with-backpacks-stand-top-crag-enjoying-sunrise_146671-15543.jpg?size=626&ext=jpg&uid=R92652548&ga=GA1.2.56007656.1676227757&semt=ais"
                  alt="img"
                />

                </PhotoView>
              
              </figure>  
              <div className="card-body h-[10rem]">
               
                <p className="font-bold">Our first TripAdvisor award</p>
                <div className="card-actions border-t-2 ">
                        <span className=" text-xs font-thin " > Michael Farade  May 12, 2023 </span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
    </PhotoProvider>
  );
};

export default Blogs;
