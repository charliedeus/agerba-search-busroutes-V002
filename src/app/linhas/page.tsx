export default async function Linhas() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/info`)

  return (
    <main>
      <h1>Linhas</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
