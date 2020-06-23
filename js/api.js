export async function getLayers () {
  const res = await fetch('http://localhost:4000/v1/list_layers')
  return res.json()
}