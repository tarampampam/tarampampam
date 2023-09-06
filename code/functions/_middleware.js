const verifyKeyMiddleware = async ({ request, next, env }) => {
  const url = new URL(request.url)

  if (url.pathname.includes('/vm/')) {
    const gotKey = request.headers.get('X-Key')

    if (!gotKey) {
      return new Response(
        new Blob([JSON.stringify({ error: 'No key header' }, null, 2)], { type: 'application/json' }),
        { status: 403 },
      )
    }

    if (gotKey !== env.ACCESS_KEY) {
      return new Response(
        new Blob([JSON.stringify({ error: 'Wrong key (fuck off, dude)' }, null, 2)], { type: 'application/json' }),
        { status: 403 },
      )
    }
  }

  return next()
}

export const onRequest = [verifyKeyMiddleware]
