import Image from "next/image";
import Link from "next/link";

import noface from "@/assets/nofaceroaming.png";

export default function Home() {
  return (
    <main>
      <Image src={noface} width={750} alt="What now?" />
      <h1>Welcome to this NextJS Course!</h1>
      <ul>
        <li><Link href="/awesome">Awesome</Link></li>
        <li><Link href="/yeets">Yeets</Link></li>
      </ul>
    </main>
  );
}
