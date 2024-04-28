import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom';
import './modal.css';
import emailjs from 'emailjs-com';
const Admindashboard = () => {

  // console.log("found?",userPayment)
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [data, setData] = useState([]);
  const [counsdata, setCounsdata] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchData = async () => {
    try {
      const url = 'https://lead-management-36cec-default-rtdb.firebaseio.com/UserData.json';

      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        const dataArray = Object.values(responseData || {});
        setData(dataArray);
      } else {
        console.error('Request failed with status', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const counsellorData = async () => {
    try {
      const url = 'https://lead-counsellor-default-rtdb.firebaseio.com/UserData.json';
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        console.log("res", responseData)
        const dataArray = Object.values(responseData || {});
        setCounsdata(dataArray);
      } else {
        console.error('Request failed with status', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const assignCounsellor = async (counsellor) => {
    if (selectedStudent && selectedCounsellor) {

      const usersRef = 'https://lead-management-36cec-default-rtdb.firebaseio.com/UserData.json';
      const response = await fetch(usersRef);
      const userData = await response.json();

      let userId = null;

      // user's unique key
      for (const key in userData) {
        if (userData[key].Email === selectedStudent.Email) {
          userId = key;
          console.log("fff", userData[key].Email)
          break;
        }
      }
      console.log("mila", selectedStudent.Email, userId)

      try {
        const counsellorInfo = counsdata.find(item => item.Email === selectedCounsellor);
        const counsellorName = counsellorInfo ? counsellorInfo.Name : '';
        console.log("naam", counsellorName)
        const response = await fetch(
          `https://lead-management-36cec-default-rtdb.firebaseio.com/UserData/${userId}.json`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              counsellor: selectedCounsellor,
              Cname: counsellorName,
            }),
          }
        );

        if (response.ok) {
          console.log("sethogaya")
          toggleModal();
        } else {
          console.error('Failed to update student');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setSelectedCounsellor(counsellor)
    console.log("c", selectedCounsellor);
    console.log("fkdj");
    console.log(selectedStudent)
    console.log(selectedCounsellor);
    setSelectedCounsellor(null)
  };

  useEffect(() => {
    fetchData();
    counsellorData();
    // console.log(data);
  }, []);

  // For modals
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const sendEmail = async (emailjsData) => {
    try {
      const result = await emailjs.send('service_mh0e5py', 'template_mucn38u', emailjsData, 'm7qRVKrwr_uw25qQ1');
      console.log(result.text);
    } catch (error) {
      console.error(error);
    }
  };


  const sendReminderEmails = async () => {

    const studentsWithFalsePayment = data.filter((student) => student.Payment === "False");
    const studentEmails = studentsWithFalsePayment.map((student) => student.Email);

    const emailjsData = {
      user_email: studentEmails.join(','), // Combine emails into a single string
    };
    try {
      if (studentEmails.length > 0) {
        await sendEmail(emailjsData);
        console.log(`Reminder email sent to students with false payment`);
        alert("Payment mail sent to all");
      } else {
        console.log(`No students with false payment found`);
      }
    } catch (error) {
      console.error('Error sending reminder email:', error);
    }
  };

  const sendEmailtoall = async (emailjsData) => {
    try {
      const result = await emailjs.send('service_mh0e5py', 'template_7azoe14', emailjsData, 'm7qRVKrwr_uw25qQ1');
      console.log(result.text);
    } catch (error) {
      console.error(error);
    }
  };


  const sendReminderEmailstoall = async () => {
    const studentEmails = data.map((student) => student.Email);

    const emailjsData = {
      user_email: studentEmails.join(','), // Combine emails into a single string
    };
    try {
      await sendEmailtoall(emailjsData);
      console.log(`sent to all students`);
      alert("Email sent to all Students");
    } catch (error) {
      console.error('Error sending reminder email:', error);
    }
  };

  //search bar
  const [search, setSearch] = useState('');



  return (
    <div className='admindashboardbanner md:h-full sm:h-screen md:min-h-screen'>
      <Header />
      <div className='container '>

        <div className='grid grid-cols-2 bg-jacarta-800 rounded-lg text-stone-50 mt-8'>
          <div className=' my-auto font-semibold py-6 px-8'>Add Counsellor / Check Status of Counsellor</div>
          <div className=' my-auto text-center'>
            <Link to='/Counsellor'>
              <button className='px-8 py-2 bg-accent-dark rounded-lg font-semibold text-white'>ADD</button>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-2 bg-jacarta-800 rounded-lg text-stone-50 mt-5'>
          <div className=' my-auto font-semibold py-6 px-8'>View Applications for Becoming Counsellor</div>
          <div className=' my-auto text-center'>
            <Link to='/CounsellorRequests'>
              <button className='px-8 py-2 bg-accent-dark rounded-lg font-semibold text-white'>View Applications</button>
            </Link>
          </div>
        </div>

        <div className='text-stone-50 font-semibold mt-4 text-center'>STUDENTS REGISTERED</div>
        <div className='border-b-2 border-blue py-2'>
          <input
          className="appearance-none bg-transparent border-none w-full text-stone-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
           type="text"
           onChange={(e) => setSearch(e.target.value)}
           placeholder='🔎 Search Name...' 
           />
        </div>


        <div className='py-4 pb-12 md:inline-block sm:flex w-full'>
          <div className='text-stone-50 grid md:grid-cols-5 text-sm font-semibold px-4 gap-2 py-5 rounded-t-lg bg-jacarta-800'>
            <div className='md:w-full sm:w-[157px] my-auto'>STUDENT NAME</div>
            <div>STUDENT EMAIL</div>
            <div>FEE STATUS</div>
            <div>COUNSELLOR</div>
            <div>ASSIGN COUNSELLOR</div>
          </div>
          <div className='w-full md:inline-block sm:flex overflow-x-auto '>
            {data.filter((plan)=>{
              return search.toLowerCase() === '' ? plan : plan.Name.toLowerCase().includes(search)
            }).map((plan, index) => (
              <div key={plan.Email} className={index % 2 === 0 ? ' container grid md:grid-cols-5 gap-2 px-4 py-3 bg-jacarta-100' : 'container grid md:grid-cols-5 gap-2 px-4 py-3 bg-jacarta-50'}>
                <div className='my-auto '>{plan.Name}</div>
                <div className='my-auto '>{plan.Email}</div>
                <div className=' my-auto '>
                  {plan.Payment}
                </div>
                <div className=' my-auto '>
                  {plan.Cname}
                </div>
                <div className='my-auto md:w-full sm:w-[170px]'>
                  <button onClick={() => {
                    setSelectedStudent(plan);
                    toggleModal();
                  }} className='bg-accent-dark text-white px-3 py-1 rounded-lg'>
                    Assign Counsellor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {modal && (
          <div className='modal'>
            <div onClick={toggleModal} className='overlay'></div>
            <div className="modal-content">
              <h2 className='text-accent-dark font-semibold text-sm '>Assign Counsellor</h2>
              <div className=' mt-3 p-2'>
                <p className=' '> Selected Student: <p className='text-accent-dark inline-block'>{selectedStudent.Name}</p></p>
                <div className=' mt-5'>
                  <select
                    value={selectedCounsellor}
                    onChange={(e) => setSelectedCounsellor(e.target.value)}
                  >
                    <option value="">Select a Counsellor</option>
                    {counsdata.map((item) => (
                      <option key={item.id} value={item.Email}>
                        {item.Name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={assignCounsellor}
                    className='text-white bg-accent hover-bg-accent-dark px-4 py-1 rounded-lg ml-24'
                  >
                    Assign
                  </button>
                </div>
              </div>
              <button className="close-modal text-accent-dark" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        )}

        <div className='grid grid-flow-col'>
          <div className='text-stone-50 font-semibold mt-4 text-center'>
            <button onClick={sendReminderEmailstoall} className='px-8 py-2 m-5 bg-accent-dark rounded-lg font-semibold text-white'>
              Send Reminder to All
            </button>
          </div>
          <div className='text-stone-50 font-semibold mt-4 text-center'>
            <button onClick={sendReminderEmails} className='px-8 py-2 m-5 bg-accent-dark rounded-lg font-semibold text-white'>
              Send Payment Reminder
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Admindashboard
