import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
    </div>
  );
}
