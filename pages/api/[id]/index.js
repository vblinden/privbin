import backend from '@/libraries/backend';

export default async function handler(req, res) {
  const { get } = backend();

  const id = req.query.id;
  const content = await get(id);

  if (!content) {
    return res.status(404).json({});
  }

  res.status(200).json({ id: id, ...content });
}
