import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddNoteForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    router.push('/');
  };

  return (
    <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg" shadow="lg" bg="white">
      <Heading mb={6} color="blue.600" textAlign="center">
        Add New Note
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
          Add Note
        </Button>
      </Box>
    </Box>
  );
}