import { Box, Heading, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import Link from 'next/link';

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <Text fontSize="lg" color="blue.500" textAlign="center" mt={4}>
        Tidak ada catatan
      </Text>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
      {notes.map((note) => (
        <GridItem key={note.id}>
          <Box p={4} borderWidth={1} borderRadius="lg" borderColor="blue.200" bg="blue.50">
            <Heading size="md" color="blue.700">{note.title}</Heading>
            <Text fontSize="sm" color="blue.500">Waktu dibuat: {note.createdAt}</Text>
            <Text mt={2} color="blue.600">Deskripsi: {note.body}</Text>
            <Link href={`/notes/${note.id}`} passHref>
              <Button mt={2} colorScheme="blue">
                View
              </Button>
            </Link>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}