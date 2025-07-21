// pages/auth/signin.js
'use client'

import Spinner from "@/components/Spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function signin() {
  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (!result.error) {
        router.push('/')
      } else {
        setError('Invalid email or password');
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Sign in failed. please try again');
      setTimeout(() => {
        setError('');
      }, 4000);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  }

  if (status === 'loading') {
    return <div className="flex flex-center wh_100"><Spinner /></div>
  }

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign In Admin</div>
          {loading ? <div className="flex flex-center w-100 flex-col"><Spinner /> Checking...</div> : <>
            <form className="form" onSubmit={handleSubmit}>
              <input type="email" name="email" onChange={handleChange} className="input" placeholder="Enter email Address" />
              <input type="password" name="password" onChange={handleChange} className="input" placeholder="Password" />
              <button className="login-button" type="submit">Sign up</button>
              {error && <p>{error}</p>}
            </form>
          </>}
        </div>
      </div>
    </>
  );
}
