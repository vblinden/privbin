import backend from '@/libraries/backend';

export default async function handler(req, res) {
  const { list } = backend();

  res.status(200).json({ entries: await list() });
}
