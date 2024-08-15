import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const note = await prisma.note.findUnique({
      where: { id: String(id) },
    });
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } else if (req.method === 'PUT') {
    const { title, body } = req.body;
    const note = await prisma.note.update({
      where: { id: String(id) },
      data: { title, body },
    });
    res.status(200).json(note);
  } else if (req.method === 'DELETE') {
    await prisma.note.delete({
      where: { id: String(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}