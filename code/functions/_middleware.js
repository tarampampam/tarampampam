const verifyTurnstileToken = async ({ request, next, env }) => {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/vm')) {
    const tt = request.headers.get('X-Tt')

    if (!tt) {
      return new Response(
        new Blob([JSON.stringify({ error: 'No token header' }, null, 2)], { type: 'application/json' }),
        { status: 403 },
      )
    }

    let formData = new FormData()

    formData.append('secret', env.TURNSTILE_SECRET_KEY)
    formData.append('response', tt)
    formData.append('remoteip', request.headers.get('CF-Connecting-IP'))

    try { // https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
      const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        body: formData,
        method: 'POST',
      })

      const data = await result.json()

      if (!data.success) {
        return new Response(
          new Blob([JSON.stringify({ error: 'Wrong token' }, null, 2)], { type: 'application/json' }),
          { status: 403 },
        )
      }
    } catch (err) {
      return new Response(
        new Blob([JSON.stringify({ error: err.toString() }, null, 2)], { type: 'application/json' }),
        { status: 500 },
      )
    }
  }

  return next()
}

export const onRequest = [verifyTurnstileToken]
