import { Box, Heading, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

type EditNoteFormProps = {
  note: Note;
};

export default function EditNoteForm({ note }: EditNoteFormProps) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    router.push('/');
  };

  return (
    <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg" shadow="lg" bg="white">
      <Heading mb={6} color="blue.600" textAlign="center">
        Edit New Note
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Body</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button mt={6} type="submit" colorScheme="blue" width="full">
          Update Note
        </Button>
      </Box>
    </Box>
  );
}