import { useState } from 'react';
import Bg from '../image/top.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState('');
  const [Password, setPassword] = useState('');
  const [ShopCode, setShopCode] = useState('');
  const [Message, setMessage] = useState('');

  const Logout = () => {
      navigate('/');
  };

  const Handle = (e) => {
      e.preventDefault();

      const user = {
          shopcode: ShopCode,
          username: User,
          password: Password
      };

      axios.post(`http://localhost:8000/login`, user)
          .then(res => {
              alert("Welcome " + res.data.user.username);
              if (res.data.usertype === "Admin") {
                  navigate('/admin');
              }
              if (res.data.usertype === "Chief") {
                  navigate('/chief');
              }
          })
          .catch(err => {
              console.error(err);
              setMessage(err.response?.data?.message || "An error occurred");
          });
  };

  return (
    <div className='bg-black h-screen'>
      <div className='bg-black w-screen h-screen'>
        <img src={Bg} className='h-60' alt="Background" />
        <div className='fixed inset-0 mt-5 ml-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-8" onClick={Logout}>
            <path fillRule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className='relative bottom-10 bg-gradient-to-b from-white to-gray-600 w-screen h-screen backdrop-blur-sm rounded-3xl my-1'>
          <div className='flex justify-center mt-20'>
            <div className='flex flex-col gap-5 mt-10'>
              <div className='mt-10 mb-6 text-2xl font-bold'>
                <h1>Admin Login</h1>
              </div>
            </div>
          </div>
          <br />
          <div className='flex justify-center'>
            <form className='w-80 flex flex-col gap-10' onSubmit={Handle}>
            <input type='text' placeholder='ShopCode' className='w-full h-12 p-3 text-black rounded-xl bg-orange-50 shadow-xl outline-transparent' onChange={e => setShopCode(e.target.value)} />
              <input type='text' placeholder='Username' className='w-full h-12 p-3 text-black rounded-xl bg-orange-50 shadow-xl outline-transparent' onChange={e => setUser(e.target.value)} />
              <input type='password' placeholder='Password' className='w-full h-12 p-3 text-gray-500 rounded-xl bg-orange-50 shadow-xl outline-transparent' onChange={e => setPassword(e.target.value)} />
              <input type="submit" className='bg-red-500 w-full h-12 rounded-full text-white text-lg shadow-xl outline-red-500' value='Login' />
            </form>
          </div>
          <h1 className='flex flex justify-center mt-20 text-red-600'>
            {Message == "Invalid Entry! Please check again" ? <span className='flex flex justify-center font-bold bg-gray-400 w-80 p-2 rounded-full'>{Message}</span> : ""}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
