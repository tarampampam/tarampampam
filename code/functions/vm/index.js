export async function onRequestGet(context) {
  /** @type {{HCLOUD_API_KEY: string, HCLOUD_CODESPACE_SERVER_ID: string}} */
  const env = context.env

  // https://docs.hetzner.cloud/#servers-get-a-server

  return new Response(
    new Blob([JSON.stringify({
      server_id: env.HCLOUD_CODESPACE_SERVER_ID,
    }, null, 2)], { type: 'application/json' }),
    {
      status: 200,
    },
  )
}
