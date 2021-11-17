import backend from '@/libraries/backend';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  const { set } = backend();

  const id = nanoid();

  await set(
    id,
    req.body.content,
    req.body.expiration || 'never',
    req.body.exposure || 'public',
    req.body.password || false,
    req.body.language || 'javascript',
    new Date().getTime(),
  );

  return res.status(200).json({ id: id });
}
