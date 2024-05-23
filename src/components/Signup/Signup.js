import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import emailjs from 'emailjs-com';
import Header from '../Header';
import { useUser } from "../UserContext";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Signup.module.css";

function Signup() {

  //for putting data in realtime database
  // const [user, setUser] = useState(
  //   {
  //       Name: '', Email: '', Gender: '', Category: '', Program: '', Payment: 'False', Password: '',
  //   }
  // );
  const { user, setUser } = useUser();
  let name, value
  // const data = (e) =>
  // {
  //   name = e.target.name;
  //   value = e.target.value;
  //   setUser({...user, [name]: value})
  // }

  const getdata = (e) => 
  {
    const {Name, Email, Gender, Category, Program, Payment, Password,Counsellor,Cname} = user;
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          Name, Email, Gender, Category, Program, Payment, Password,Counsellor,Cname
      })
    }
    const res = fetch('https://lead-management-36cec-default-rtdb.firebaseio.com/UserData.json',options)
    if(res)
    {
      navigate("/dashboard")
      alert("Signup succesfull")
    }
    else
    {
      alert("Error occured")
    }
  }


  const sendEmail = async (emailjsData) => {
    try {
      const result = await emailjs.send('service_219robq', 'template_xckno4s', emailjsData, '1-Y5d5TGmZp1y_gYP');
      console.log(result.text);
    } catch (error) {
      console.error(error);
    }
  };

  //

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 6; 
  };
  const handleSubmission = (e) => {
    console.log("enter")
    e.preventDefault();
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    if (!validateName(values.name)) {
      setErrorMsg("Name can only contain letters and spaces");
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMsg("Invalid email format");
      return;
    }
    if (!validatePassword(values.pass)) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }
    setErrorMsg("");
    console.log("a enter")

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        console.log("f enter")
        const emailjsData = {
          user_name: values.name,
          user_email: values.email,
          user_password: values.pass,
        };
        console.log("d enter")
        sendEmail(emailjsData);
        console.log("d2 enter")

        const userData = {
          Name: values.name,
          Email: values.email,
          Gender:"", 
          Category:"", 
          Program:"",
           Payment:"False",
           counsellor:"demosmvdu@gmail.com",
            Password:values.pass,
            Cname:""
        }; 
        const {Name, Email, Gender, Category, Program, Payment, Password,Counsellor,Cname} = user;
        e.preventDefault();
        console.log("fkjda",Name,user.displayName,user.email,user
        );
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
        const resp = fetch('https://lead-management-36cec-default-rtdb.firebaseio.com/UserData.json',options)
        if(resp)
        {
          navigate("/dashboard")
          alert("Signup Succesfull")
        }
        else
        {
          alert("Error occured")
        }
        navigate("/Dashboard");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (

    <div className=" md:flex sm:inline-block signupbanner md:h-screen">
      <div className=" border-red p-8 pt-12">

        <div className="border-b md:w-3/5 sm:w-full border-b-[#225296] pb-16">
          <div className=" text-light-base font-semibold">AN ILLUSTRIOUS CAREER BEGINS AT</div>
          <div className="text-[#f7a300] font-semibold text-6xl">J&K NO. 1</div>
          <div className="text-[#f7a300] font-semibold text-5xl"> STATE UNIVERSITY</div>
          <div className="text-light-base ">SMVDU offers top-notch career opportunities and global exposure, recognizing academic excellence with</div>
          <div className="text-[#e9c681] font-semibold text-lg">scholarships worth Crores.</div>
        </div>

        <div className=" mt-8 md:flex sm:inline-block">
          <div className="">
            <div className="text-light-base font-semibold text-xl">EMPOWERING DREAMS WITH</div>
            <div className="text-[#f7a300] font-semibold text-xl">ELITE PLACEMENTS</div>

            <div className="border border-[#225296] mt-5 p-4  bg-[#0b3671] rounded-lg">
              <div className="text-light-base font-semibold text-sm">GENERATING WORLD-CLASS OPPORTUNITIES</div>
              <div className="text-[#e9c681] text-3xl font-semibold">400+ PLACEMENT</div>
              <div className="text-[#e9c681] text-3xl font-semibold">OFFERS</div>
              <div className="text-light-base">WITH THE HIGHEST PACKAGE OF ₹15 LPA FOLLOWED BY ₹7 LPA AS AVERAGE PACKAGE</div>
            </div>
          </div>

          <div className=" ">

            <div className=" flex justify-center">
              <div className=" w-1/2">
                <div className="text-light-base font-semibold text-sm">SMVDU RANKS</div>
                <div className="text-[#e9c681] text-3xl font-semibold">101th</div>
                <div className="text-light-base">AMONG ENGINEERING INSTITUTIONS IN INDIA BY NIRF 2022 </div>
              </div>
              <div>
                <img src="https://cucet.cuchd.in/new-assets/img/nirf-logo.webp" alt="img" />
              </div>
            </div>

            <div className=" flex mt-3 justify-center">
              <div className=" w-1/2">
                <div className="text-light-base font-semibold text-sm">SMVDU RANKED IN</div>
                <div className="text-[#e9c681] text-3xl font-semibold">801-1000 band</div>
                <div className="text-light-base">AMONG TOP UNIVERSITIES IN WORLD BY WORLD UNIVERSITY RANKING 2023 </div>
              </div>
              <div>
                <img src="https://cucet.cuchd.in/new-assets/img/qs-ranking-logo-subject.webp" alt="img" />
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="md:mr-[80px] my-auto">
        <div className={styles.innerBox}>
          {/* <form onSubmit={handleSubmission}> */}
          <h1 className='text-white text-xl font-semibold text-center '>ONLINE APPLICATION</h1>
          <p className="text-orange text-center font-semibold  text-md">Apply for SMVDU entrance</p>

          <InputControl
            name="user_name"
            // label="Name"
            placeholder="STUDENT NAME"
            // value={user.Name}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            name="user_email"
            // label="Email"
            placeholder="STUDENT EMAIL ADDRESS"
            // value={user.Email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            name="user_password"
            // label="Password"
            placeholder="STUDENT PASSWORD"
            // value={user.Password}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}>
              REGISTER
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>

  );
}

export default Signup;
