export async function onRequestPost(context) {
  /** @type {{HCLOUD_API_KEY: string, HCLOUD_CODESPACE_SERVER_ID: string}} */
  const env = context.env

  try {
    await fetch( // https://docs.hetzner.cloud/#server-actions-power-on-a-server
      new Request(`https://api.hetzner.cloud/v1/servers/${env.HCLOUD_CODESPACE_SERVER_ID}/actions/poweron`),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${env.HCLOUD_API_KEY}`,
        },
      },
    )

    return new Response(
      new Blob([JSON.stringify({ success: true }, null, 2)], { type: 'application/json' }),
      { status: 200 },
    )
  } catch (err) {
    return new Response(
      new Blob([JSON.stringify({ error: err }, null, 2)], { type: 'application/json' }),
      { status: 500 },
    )
  }
}
