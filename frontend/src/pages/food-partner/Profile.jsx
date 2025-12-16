import React from 'react'
import Layout from '../../components/Layout'
import ThemeToggle from '../../components/ThemeToggle'

const Profile = () => {
  return (
   <>
    <Layout hideFooter={true}>
      <section className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-md text-center flex flex-col gap-6">
          <div className="bg-card items-center  rounded-xl shadow-card  p-4  ">
            <div className=' flex gap-3'>
            <div>
            <img src="https://via.placeholder.com/150" alt="Profile" className="flex  w-14 h-14 rounded-full overflow-hidden bg-gray-400 "/>
            </div>
            <div className="flex flex-col gap-1 text-left">
              <div><h2 className="bg-tile border-1 border-gray-600 rounded-md px-2 py-1 font-semibold text-text ">Buisness Name</h2></div>
              <div><h2 className="bg-tile w-fit border-1 border-gray-600 rounded-md px-2 py-1 text-xs font-light text-gray-400 ">Address</h2></div>
            </div>
            </div>
            <hr className='my-2 opacity-10'/>
            <div className='grid grid-cols-2'>
              <div>
                <h4 className="font-md text-gray-400 text-xs">Total Meals</h4>
                <p className='font-black '>43</p>
              </div>
              <div>
                 <h4 className="font-md text-gray-400 text-xs">Customer Serve</h4>
                <p className='font-black '>15K</p>
              </div>

            </div>
            </div>
          </div>
       
      </section>
    </Layout>

   
    </>
  
  )
}

export default Profile