import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <button>
        <Link href='/signUp'>sign up</Link>
      </button>
    </div>
  );
}
