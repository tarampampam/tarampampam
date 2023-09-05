const verifyTurnstileToken = async ({ request, next, env }) => {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/vm')) {
    const tt = request.headers.get('X-Tt')

    if (!tt) {
      return new Response(
        new Blob([JSON.stringify({ error: 'No token header was passed' }, null, 2)], { type: 'application/json' }),
        { status: 403 },
      )
    }
  }

  return next()
}

export const onRequest = [verifyTurnstileToken]
