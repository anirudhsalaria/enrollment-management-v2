import React, { useState,useEffect } from 'react'
import Header from '../Header'
import { Link ,useNavigate} from 'react-router-dom';
import { auth } from '../../firebase';

const Form = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else setUserEmail("");
    });
  }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState(
    {
        Name: '', Email: userEmail, Gender: '', Category: '', Program: '',
    }
  );


console.log("found?",userEmail)
  
  let name, value
  console.log(user)
  const data = (e) =>
  {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value})
  }

  const getdata =async (e) => 
  {
    const {Name, Email, Gender, Category, Program} = user;
    e.preventDefault();

///
const usersRef = 'https://lead-management-36cec-default-rtdb.firebaseio.com/UserData.json';
const response = await fetch(usersRef);
const userData = await response.json();

let userId = null;

// user's unique key
for (const key in userData) {
  if (userData[key].Email === userEmail) {
    userId = key;
    break;
  }
}
console.log("mila",Email,userId)
///
if (userId) {
  const updatedUserData = {
    Name,
    Email,
    Gender,
    Category,
    Program,
}
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUserData)
    }
    const res = await fetch(`https://lead-management-36cec-default-rtdb.firebaseio.com/UserData/${userId}.json`, options);
    if(res)
    {
      navigate("/dashboard")
      alert("Application Submitted, Kindly Proceed to Payment")
    }
    else
    {
      alert("Error occured")
    }
  }
};
  return (
    <div className='w-full'>
      <Header/>
      <div className="formbanner py-6 flex items-center justify-center bg-jacarta-100">
      <div className="bg-jacarta-50 p-8 rounded shadow-lg md:w-1/2 sm:w-96">
        <h2 className=" text-accent text-2xl font-semibold mb-4 text-center">SMVDU Admission Form</h2>

        <form method='POST' action='' id='admissionForm'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-jacarta-600">FULL NAME</label>
            <input
             className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800"
              type="text"
              name='Name'
              // className="mt-1 p-2 w-full border border-jacarta-300 outline-none rounded-md"
              placeholder="John Doe"
              value={user.Name}
              onChange={data}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-jacarta-600">EMAIL</label>
            <input
              type="email"
              name='Email'
              className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800"
              placeholder="john@example.com"
              value={user.Email}
              onChange={data}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-jacarta-600">GENDER</label>
            <select
             className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800"
             name='Gender' value={user.Gender} onChange={data} required>
              <option selected>Select Gender</option>
              <option >Male</option>
              <option >Female</option>
              <option >Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-jacarta-600">CATEGORY</label>
            <select name='Category' value={user.Category} onChange={data}                                     className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800" required>
              <option  selected>Select Category</option>
              <option >General</option>
              <option >EWS</option>
              <option >OBC</option>
              <option >SC</option>
              <option >ST</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-jacarta-600">SELECT PROGRAM</label>
            <select name='Program' value={user.Program} onChange={data} className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800" required>
              <option selected>Select a program</option>
              <option >Computer Science</option>
              <option >Engineering</option>
              <option >Business Administration</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-jacarta-600">UPLOAD DOCUMENTS</label>
            <input name='document' value={user.document} onChange={data} type="file" className="mt-1 w-full" accept=".pdf,.docx,.jpg,.png"  />
          </div>
          <div className="mt-6">
            <Link to='/Checkout'>
            <button
              type="submit"
              className="w-full bg-accent text-white p-2 rounded hover:bg-accent-dark transition duration-300"
              onClick={getdata}
            >
              SUBMIT APPLICATION
            </button>
            </Link>
          </div>
        </form>
      </div>
      
    </div>
    </div>
  )
}

export default Form

