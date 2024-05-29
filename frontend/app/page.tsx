import Image from "next/image";
import SignInButton from "./components/SignInButton";
import Link from "next/link";

export default function Home() {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        DashBoard
      </Link>

      <SignInButton />
    </header>
  );
}
