export async function onRequestGet(context) {
  /** @type {{HCLOUD_API_KEY: string, HCLOUD_CODESPACE_SERVER_ID: string}} */
  const env = context.env

  try {
    const resp = await fetch( // https://docs.hetzner.cloud/#servers-get-a-server
      new Request(`https://api.hetzner.cloud/v1/servers/${env.HCLOUD_CODESPACE_SERVER_ID}`),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${env.HCLOUD_API_KEY}`,
        },
      },
    )

    const data = await resp.json()

    return new Response(
      new Blob([JSON.stringify({ status: data.server.status }, null, 2)], { type: 'application/json' }),
      { status: 200 },
    )
  } catch (err) {
    return new Response(
      new Blob([JSON.stringify({ error: err.toString() }, null, 2)], { type: 'application/json' }),
      { status: 500 },
    )
  }
}
