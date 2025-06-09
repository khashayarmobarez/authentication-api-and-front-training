import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/user')
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
  },[])

  const logoutHandler = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (data.status === 'success') {
      window.location.href = '/login'; 
    } else {
      console.error('Logout failed');
    }
  }

  return (
    <div className="flex flex-col gap-y-4 text-2xl">
      {
        isLoggedIn ? 
        <>
          <button>
            <Link href='/dashboard'>dashboard</Link>
          </button>
          <button onClick={logoutHandler}>
            Log out
          </button>
        </>
        :
        <>
          <button>
            <Link href='/signUp'>sign up</Link>
          </button>
          <button>
            <Link href='/login'>login</Link>
          </button>
        </>
      }
    </div>
  );
}
