import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import Header from "../Header";
import Footer from "../Footer/Footer";
function Home(props) {
  return (


    <div className="w-full h-full"  >
      <Header />


      <div class="grid md:grid-cols-2 sm:grid-rows-2 gap-4 p-16 landingbanner">
        <div className="">
          <div className="container h-full mx-auto">
            <div className="grid h-full items-center gap-4 md:grid-cols-10">
              <div className="h-full items-center py-8 md:items-start md:py-10 xl:col-span-6">
                <div className="text-stone-50 font-bold  md:text-6xl sm:text-3xl ">
                  First Experience then Proceed
                </div>
                <div className="text-white  text-lg">Empowering Careers & Fulfilling Dreams</div>
                <div className="text-stone-50 font-semibold text-lg">With Scholarships worth Crores</div>
                <div className="p-2 mt-6">
                  <Link to='/signup'>
                    <button className=" hover:cursor-pointer bg-red border-white hover:bg-accent-dark  font-semibold rounded py-[10px] px-8 text-center text-white transition-all applybutton"
                    >
                      APPLY NOW →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div>
          <div className="font-bold text-5xl text-stone-50 p-5">{props.name ? `Welcome - ${props.name}` : "Login please"}</div>
          <p className="text-stone-50 text-lg md:text-left flex flex-wrap tracking-wide italic">
            We dont just give students an education and experiences that set them up for success in a career. We help them succeed in their career—to discover a field they’re passionate about and dare to lead it.</p>
        </div>
      </div>



      {/* tophighlights */}
      <div className=" mb-4 py-4 bg-stone-50">
        <div className="text-center font-thin mt-5">
          <h1 className="font-extralight tracking-wide text-blue text-5xl"></h1>
        </div>

        <div class="grid md:grid-cols-3 gap-8 md:px-28 sm:px-12 my-8">
          <div class="rounded-lg shadow-jacarta-500 shadow-2xl landingactivity">
            <a href="#">
              <img class="rounded-t-lg" src="https://smvdu.ac.in/wp-content/uploads/2023/06/final2-1.jpg" alt="" style={{ width: "100%", height: "60%" }} />
            </a>
            <div class="p-2 mt-3 text-center">
              <p class="mb-3">Vice Chancellor's Message
                Prof. (Dr.) Pragati Kumar. It gives me great pride and pleasure to assume the office of the Vice-Chancellor of Shri Mata Vaishno Devi University (SMVDU) which is situated in the spiritual lap of Maa Bhagwati. </p>
            </div>
          </div>
          <div class=" rounded-lg  shadow-jacarta-500 shadow-2xl bg-stone-50 landingactivity">
            <a href="#">
              <img class="rounded-t-lg" src="https://smvdu.ac.in/wp-content/uploads/2023/10/Copy-of-Student-Achievements-400x245.jpg" alt="" style={{ width: "100%", height: "60%" }} />
            </a>
            <div class="p-2 mt-3 text-center">
              <p class="mb-3 ">Jeetendra Kumar, Alumni of Mechanical Engineering, Shri Mata Vaishno Devi University, Katra, Jammu and Kashmir; has made an important contribution to India’s Chandrayaan 3 mission to the Moon and the LVM 3 rocket that carried it. </p>
            </div>
          </div>
          <div class="rounded-lg shadow-jacarta-500 shadow-2xl bg-stone-50 landingactivity">
            <a href="#">
              <img class="rounded-t-lg" src="https://smvdu.ac.in/wp-content/uploads/2023/10/dsadsd-1-400x245.jpg" alt="" style={{ width: "100%", height: "60%" }} />
            </a>
            <div class="p-2 mt-3 text-center">
              <p class="mb-3">The Internal Complaint Committee (ICC) and National Service Scheme (NSS), SMVDU joined hands to organize a One Day Awareness Campaign on Women’s Rights and Domestic Violence (Prevention of Sexual Harassment Act) on 13th October 2023 at the Matrika Auditorium.</p>
            </div>
          </div>

        </div>
      </div>



      <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-8 md:px-28 sm:px-8 my-8">

        <div class="max-w-sm bg-white shadow-2xl shadow-jacarta-300 landingactivity rounded-lg text-center">
          <div className="">
            <img class="rounded-t-lg mx-auto" src="https://www.lpu.in/images/icons/student-icon.png" alt="" />
          </div>
          <div class="p-5 container">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">30000+</h5>
            <p className="font-extralight text-sm tracking-wide">Student</p>

          </div>
        </div>
        <div class="max-w-sm bg-white shadow-2xl shadow-jacarta-300 landingactivity rounded-lg text-center">
          <div className="">
            <img class="rounded-t-lg mx-auto" src="https://www.lpu.in/images/icons/alumni-icon.png" alt="" />
          </div>
          <div class="p-5 container">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">50k+</h5>
            <p className="font-extralight text-sm tracking-wide text-gray-500">Alumini</p>
          </div>
        </div>
        <div class="max-w-sm bg-white shadow-2xl shadow-jacarta-300 landingactivity rounded-lg text-center">
          <div className="container">
            <img class="rounded-t-lg mx-auto" src="https://www.lpu.in/images/icons/campus-icon.png" alt="" />
          </div>
          <div class="p-5 container">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">600+</h5>
            <p className="font-extralight text-sm tracking-wide">Events</p>

          </div>
        </div>
        <div class="max-w-sm bg-white shadow-2xl shadow-jacarta-300 landingactivity rounded-lg text-center">
          <div className="">
            <img class="rounded-t-lg mx-auto" src="https://www.lpu.in/images/icons/profile-icon.png" alt="" />
          </div>
          <div class="p-5 container">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">300+</h5>
            <p className="font-extralight text-sm tracking-wide">Profile visitors</p>

          </div>
        </div>

      </div>


      {/* 
<div className="text-center font-thin ">
  <h1 className="font-thin tracking-wide text-red text-5xl">#Rankings</h1>
  </div> */}

      <div class="grid md:grid-cols-3 gap-8 md:px-28 sm:px-16 my-8">
        <div class="  bg-teal border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ boxShadow: "0 0 20px #ccc" }}>
          <img class="rounded-t-lg" src="https://smvdu.ac.in/wp-content/uploads/2023/06/05082022_nirf2022EnggRank.jpg" style={{ width: "100%" }} alt="" />
        </div>
        <div class="  bg-teal border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ boxShadow: "0 0 20px #ccc" }}>
          <img class="rounded-t-lg" src="https://smvdu.ac.in/wp-content/uploads/2023/06/05082022_nirf2022EnggRank.jpg" style={{ width: "100%" }} alt="" />
        </div>
        <div class="  bg-teal border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ boxShadow: "0 0 20px #ccc" }}>
          <img class="rounded-t-lg" src="https://smvdu.ac.in/wp-content/uploads/2023/06/05082022_nirf2022ArchRank.jpg" style={{ width: "100%" }} alt="" />
        </div>


      </div>




      <Footer />
    </div>
  );
}

export default Home;
