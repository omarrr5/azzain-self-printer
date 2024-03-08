import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useState} from "react";
import BackgroundAnimation from "../components/BackgroundAnimation.jsx";


const Login = () => {

  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const nameRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = ev => {
    ev.preventDefault()

    const payload = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      }) 
  }

  return (
    <div>
      <BackgroundAnimation/>
      <div className="login-form">
        <h1>Login to Azzain Ink</h1>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
      </div> 
    </div>
  )
}

export default Login