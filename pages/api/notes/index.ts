import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const notes = await prisma.note.findMany();
    res.status(200).json(notes);
  } else if (req.method === 'POST') {
    const { title, body } = req.body;
    const note = await prisma.note.create({
      data: { title, body },
    });
    res.status(201).json(note);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}