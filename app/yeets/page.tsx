import Link from "next/link";


export default function Yeets() {
    return <main>
        <h1>Yeets</h1>
        <p><Link href="/yeets/1">Something something</Link></p>
        <p><Link href="/yeets/2">Something other</Link></p>
    </main>
}