import React from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase'
// import { useMediaQuery } from 'react-responsive';

const Dashboard = (props) => {

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userProgram, setUserProgram] = useState("");
  const [userPayment, setUserPayment] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)
        setUserEmail(user.email);

      } else setUserEmail("");
    });
    const fetchData = async () => {
      try {
        const response = await fetch('https://lead-management-36cec-default-rtdb.firebaseio.com/UserData.json');
        const userData = await response.json();

        let userId = null;

        // user's unique key
        for (const key in userData) {
          if (userData[key].Email === userEmail) {
            userId = key;
            break;
          }
        }

        console.log("mila", userEmail, userId);
        console.log("Program chosen: ", userData[userId]?.Program);
        setUserProgram(userData[userId]?.Program);
        setUserPayment(userData[userId]?.Payment);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userEmail]);


  return (
    <div className="w-full h-full min-h-screen ">
      <Header />
      <div className='studentdashboardbanner flex'>
        <div className='md:w-[284px]'>
          <Sidebar />
        </div>
        <div>
          <div className="font-bold text-xl text-stone-50 p-5">{props.name ? `Welcome - ${props.name}!` : "Login please"}</div>
          <div className="p-6 ">
            <div className='text-red font-semibold pb-3'>Application Form</div>

            <div className=' p-6 rounded-lg bg-jacarta-900'>
              <div className='md:flex md:gap-64'>
                <div className=' m-auto text-stone-50'>Application for the admission in the course of Bachelor of Technology 2024</div>
                <div>

                  {userProgram ? (
                    <Link to='/Checkout'>
                      <button
                        // Disable the button if the payment has already been done

                        className={`${userPayment == "True" ? 'disabled bg-jacarta-400 cursor-not-allowed' : 'bg-accent hover:bg-accent-dark'
                          } text-white font-bold py-2 px-4 rounded transition duration-300`}
                      >
                        {userPayment == "True" ? 'Payment Done' : 'Pay Now'}
                      </button>
                    </Link>
                  ) : (
                    <Link to='/Form'>
                      <button className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300">
                        Fill Online Form
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className='bg-jacarta-900 p-6 rounded-lg my-14'>
              <div className='md:flex md:gap-64'>
                <div className='text-stone-50 m-auto'>Application for the admission in the course of Bachelor of Architecture 2024</div>
                <div>

                  <button className="disabled bg-red text-white font-bold py-2 px-4 rounded transition duration-300">
                    Application Closed
                  </button>

                </div>
              </div>
            </div>
            <div className=' p-6 rounded-lg bg-jacarta-900'>
              <div className='md:flex md:gap-64'>
                <div className='text-stone-50 m-auto'>Application for the admission in the course of Master of Business Administration</div>
                <div>

                  <button className="disabled bg-red text-white font-bold py-2 px-4 rounded transition duration-300">
                    Application Closed
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
