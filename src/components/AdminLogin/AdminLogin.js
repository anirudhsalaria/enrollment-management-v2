import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    if(values.email === 'smvduadmin@gmail.com' && values.pass === 'admin123'){
        navigate('/AdminDashboard')
    }
    else{
        setErrorMsg("Wrong Email or Password");
        return;
    }
    setErrorMsg("");
  };

  return (
    <div className=" h-screen adminloginbanner">
      <div className="pt-4">
        <img className='mx-auto ' src="https://www.careeryojana.in/wp-content/uploads/2021/04/SMVDU-University.png" alt="img" height='155px' width='155px' />
      </div>

      <div className=' mt-16'>
        <div className={styles.innerBox}>
          <h1 className="font-semibold text-lg">ADMIN LOGIN</h1>

          <InputControl
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <InputControl
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
