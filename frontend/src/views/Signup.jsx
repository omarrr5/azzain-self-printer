import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider";
import BackgroundAnimation from "../components/BackgroundAnimation.jsx";

export default function Signup() {
    const nameRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const {setUser, setToken} = useStateContext();
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState(null);
  
    const handleSubmit = ev => {
      ev.preventDefault()
  
      const payload = {
        username: nameRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      }

      axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }


  return (
    <div>
      <BackgroundAnimation/>
      <div className="login-form">
        <h1>Signup to Azzain Ink</h1>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              ref={nameRef}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <label htmlFor="password-confirmation">Repeat pass</label>
            <input
              type="password"
              ref={passwordConfirmationRef}
              required
            />
          </div>
          <button type="submit" className="login-button">Signup</button>
        </form>
      </div> 
    </div>
  )
}