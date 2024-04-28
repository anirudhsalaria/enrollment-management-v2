import React from 'react'

const Cancel = () => {
  return (
    <div>
        <div className=" h-screen loginbanner opacity-90">
      <div className="pt-4 ">
        <img className='mx-auto' src="https://www.careeryojana.in/wp-content/uploads/2021/04/SMVDU-University.png" alt="img" height='155px' width='155px' />
      </div>

      <div className=' mt-16'>
        <div >
         
        <div class="bg-gray-200 w-full px-16 md:px-0 flex items-center justify-center">
    <div class="flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-white">404</p>
        <p class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-red mt-4">Page Not Found</p>
        <p class="text-gray-500 mt-4 pb-4 border-b-2 text-white">Sorry, the page you are looking for could not be found.</p>
        <a href="/dashboard" class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{color:"white"}}>
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <span className='text-white'>Return Home</span>
        </a>
    </div>
</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cancel