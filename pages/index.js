import Image from "next/image";
import Link from "next/link";

export default function Home() {

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
      <button>
        <Link href='/signUp'>sign up</Link>
      </button>
      <button>
        <Link href='/login'>login</Link>
      </button>
      <button>
        <Link href='/dashboard'>dashboard</Link>
      </button>
      <button onClick={logoutHandler}>
        Log out
      </button>
    </div>
  );
}
