export default function YeetDetail({ params } : { params: { yeet: string}}) {
    return (
        <main>
            <h1>Yeet detail for { params.yeet }</h1>
        </main>
    )
}