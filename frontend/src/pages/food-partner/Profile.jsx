import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/food-partner/${id}`, {withCredentials: true});
        setProfile(response.data);
        setVideos(response.data.foodPartner.foodItems || []);
      } catch (error) {
        console.error("Error fetching profile:", error);

      }
    };

    fetchProfile();
  }, [id]);

  return (
   <>
    <Layout hideFooter={true}>
      <section className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-md text-center flex flex-col gap-6">
          <div className="bg-card items-center  rounded-xl shadow-card  p-4  ">
            <div className=' flex gap-3'>
            <div>
            <img src="https://images.unsplash.com/photo-1765469504833-98fcf44d96b6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="flex object-cover w-14 h-14 rounded-full overflow-hidden bg-gray-400 "/>
            </div>
            <div className="flex flex-col gap-1 text-left">
              <div><h2 className="bg-tile border-1 border-gray-600 rounded-md px-2 py-1 font-semibold text-text ">{profile?.foodPartner.name}</h2></div>
              <div><h2 className="bg-tile w-fit border-1 border-gray-600 rounded-md px-2 py-1 text-xs font-light text-gray-400 ">{profile?.foodPartner.location}</h2></div>
            </div>
            </div>
            <hr className='my-2 opacity-10'/>
            <div className='grid grid-cols-2'>
              <div>
                <h4 className="font-md text-gray-400 text-xs">Total Meals</h4>
                <p className='font-black '>{profile?.totalMeals}</p>
              </div>
              <div>
                 <h4 className="font-md text-gray-400 text-xs">Customer Serve</h4>
                <p className='font-black '>{profile?.customerServe}</p>
              </div>


            </div>
            </div>
             <div className="grid grid-cols-3 gap-3">
  {videos.map((video, i) => (
    <div
      key={video._id || i}
      className="relative bg-black rounded-md h-30 overflow-hidden shadow-md"
    >
      <video
        src={video.videoUrl || video.video} // Use whichever key holds your URL
        className="w-full h-full object-cover pointer-events-none"
        muted
        playsInline
        onMouseOver={(e) => e.target.play()} // Optional: play on hover
        onMouseOut={(e) => e.target.pause()}
      />
     
    </div>
  ))}

              
             
            </div>
          </div>
       
      </section>
    </Layout>

   
    </>
  
  )
}

export default Profile