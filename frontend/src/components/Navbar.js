import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [userInfo, setUserInfo] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setSession(data.session);
        handleName(data.session);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setSession(session);
        handleName(session);
      } else {
        setSession(null);
        setUserInfo('user');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      navigate('/login');
    }
  };

  const handleName = (session) => {
    let userInfo;

    if (session.user.id === '4eba580a-5523-41ba-be24-2849bb4b64f1') {
      userInfo = "Max";
    } else if (session.user.id === '4b9c272a-5094-4fa5-9ad0-0db9e8762266') {
      userInfo = "Paras";
    } else if (session.user.id === '8f2241b1-7c7c-4324-9865-21105ad0eb4c') {
      userInfo = "Petr";
    } else {
      userInfo = "User";
    }

    setUserInfo(userInfo);
  };

  return (
    <div className="navbar">
      <h2>Welcome, {userInfo}</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={handleLogout} className='logoutbutton'>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
