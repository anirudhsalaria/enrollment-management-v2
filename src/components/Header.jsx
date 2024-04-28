import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase'
import "./ApplyForCounsellors.css";

const Header = () => {

  //for responsiveness

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsMobileMenuOpen(false); // Close the mobile menu on resize
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigate = useNavigate()
  function handleLogout() {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/signup")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  const [modal, setModal] = useState(false);
  // For modals
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  //for submitting modal details
  const [data, setData] = useState([]);
  const [user, setUser] = useState(
    {
      Name: '', Email: '', Mobile: '', cgpa: '', Count: 0,
    }
  );
  const postData = (e) => {
    const { Name, Email, Mobile, cgpa, Count } = user;
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name, Email, Mobile, cgpa, Count
      })
    }
    const res = fetch('https://leadmgmt-fc334-default-rtdb.firebaseio.com/UserData.json', options)
    if (res) {
      alert("Application Submitted")
    }
    else {
      alert("Error occured")
    }
  }

  return (
    <div>
      <nav className={`bg-jacarta-800 p-2 bg-[#00007a;] `}>
        <div className={`container mx-auto flex justify-between items-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
          {!isMobile ? <img className="checkoutImg" src="https://www.careeryojana.in/wp-content/uploads/2021/04/SMVDU-University.png"
            alt="logo" /> : <div></div>}
          <div className="text-white font-bold text-lg flex gap-8">
            {isMobile ? <img className="checkoutImg" src="https://www.careeryojana.in/wp-content/uploads/2021/04/SMVDU-University.png"
              alt="logo" /> : <div></div>}
            <div className='m-auto'>SMVDU Admissions</div>
            <div className="cursor-pointer m-auto" onClick={toggleMobileMenu}>
              {isMobile ? <div className='text-white text-xl'>☰</div> : <div ></div>}
            </div>
          </div>

          {(!isMobile || (isMobile && isMobileMenuOpen)) && (
            <div className={`space-x-4 grid  ${isMobile ? ' grid-flow-row items-center w-full gap-1' : 'grid-flow-col items-center'}`}>
              <Link to='/login'><div className={`${isMobile ? '  text-center p-2 px-4 bg-jacarta-700 rounded-lg' : ''}`}><button className={`text-white hover:text-jacarta-300 transition duration-300 `}>Student Login</button></div></Link>
              <Link to='/signup'><div className={`${isMobile ? ' p-2 bg-jacarta-700 rounded-lg text-center' : ''}`}><button className={`text-white hover:text-jacarta-300 transition duration-300`}>Signup</button></div></Link>
              <Link to='/AdminLogin'><div className={`${isMobile ? ' p-2 bg-jacarta-700 rounded-lg text-center' : ''}`}><button className="text-white hover:text-jacarta-300 transition duration-300">Admin Login</button></div></Link>

              <button className=" bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300" onClick={handleLogout}>
                Logout
              </button>

              <div className={`${isMobile ? 'bg-accent hover:bg-accent-dark rounded-sm text-center' : ''}`}>
                <a href="mailto:admissions@smvdu.ac.in?subject=Your%20Subject&body=Your%20Message">
                  <button className=" text-white py-2 px-2 rounded transition duration-300">
                    Admission Helpline
                  </button>
                </a>
              </div>

              <div>
                <button onClick={() => { toggleModal(); }} className='bg-accent text-white font-bold py-2 px-4 rounded hover:bg-accent-dark'>
                  Become Counsellor
                </button>
              </div>
            </div>
          )}

        </div>
      </nav>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <div className=''>
              <img className='mx-auto ' src="https://smvdu.ac.in/wp-content/uploads/2023/07/logo-g20-1.png" alt="" height={190} width={220} />
            </div>
            <div className=' text-center text-white text-[17px] font-semibold'>Apply to become a Counsellor</div>

            <div className=' mt-3'>
              <label className='text-white text-sm font-semibold'>Email Address</label>
              <br />
              <input
                type="email"
                name='email'
                className='bg-[#E8F0FE] rounded my-2 w-full p-2 outline-none text-sm'
                value={user.Email}
                onChange={(event) => setUser((prev) => ({ ...prev, Email: event.target.value }))}
                required
              />
              <label className='text-white text-sm font-semibold'>Name</label>
              <br />
              <input
                type="name"
                name='name'
                className='bg-[#E8F0FE] rounded my-2 w-full p-2 outline-none text-sm'
                value={user.Name}
                onChange={(event) => setUser((prev) => ({ ...prev, Name: event.target.value }))}
                required
              />
              <label className='text-white text-sm font-semibold'>Contact Number</label>
              <br />
              <input
                type="phone"
                name='phone'
                className='bg-[#E8F0FE] rounded my-2 w-full p-2 outline-none text-sm'
                value={user.Mobile}
                onChange={(event) => setUser((prev) => ({ ...prev, Mobile: event.target.value }))}
                required
              />
              <label className='text-white text-sm font-semibold'>CGPA</label>
              <br />
              <input
                type="number"
                name='cgpa'
                className='bg-[#E8F0FE] rounded my-2 w-full p-2 outline-none text-sm'
                value={user.cgpa}
                onChange={(event) => setUser((prev) => ({...prev, cgpa: event.target.value}))}
                required
              />
            </div>

            <div className=' text-center mt-6'>
              <button type='submit' onClick={postData} className='text-white px-7 py-3 bg-red rounded font-semibold text-md hover:bg-accent-dark transition-all applybutton'>
                Submit Application
              </button>
            </div>

          </div>
        </div>
      )}
    </div>

  )
}

export default Header
