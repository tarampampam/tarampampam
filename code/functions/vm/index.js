export async function onRequestGet(context) {
  return new Response(
    new Blob([JSON.stringify({
      foo: 'bar',
    }, null, 2)], { type: 'application/json' }),
    {
      status: 200,
    },
  )
}
