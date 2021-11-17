export async function middleware(request, ev) {
  const host = request.url.split('/').slice(0, 3).join('/');
  const response = await fetch(`${host}/api/${request.page.params.id}/raw`);

  return new Response(await response.text());
}
