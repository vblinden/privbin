import backend from '@/libraries/backend';

export default async function handler(req, res) {
  const { get } = backend();

  const id = req.query.id;
  const entry = await get(id);

  if (!entry) {
    return res.status(404).json({});
  }

  return res.status(200).send(entry.content);
}
