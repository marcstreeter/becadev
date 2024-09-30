import { Box } from "@/components/Box";

export const metadata = {
    title: "well what do we have here?",
    description: "My own nextjs place"
}

export default function AwesomePage() {
    return (
        <main>
            <h1>NextJS SSG could be better! Life waffles...</h1>
            <Box author="Marc" body="He's a developer" />
            <Box author="Dalinda" body="She's a developer" />
        </main>
    );
}