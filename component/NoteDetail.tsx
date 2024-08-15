import { Box, Heading, Text, Button, VStack, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/');
    } else {
      alert('Failed to delete the note.');
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" bg="white" shadow="lg">
      <Heading size="md" color="blue.700" mb={4}>
        {note.title}
      </Heading>
      <Text fontSize="sm" color="blue.500" mb={4}>
        Waktu dibuat: {note.createdAt}
      </Text>
      <Text mb={6} color="blue.600">
        Deskripsi: {note.body}
      </Text>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Link href={`/notes/edit?id=${note.id}`} passHref>
            <Button colorScheme="yellow" width="full">
              Edit
            </Button>
          </Link>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </HStack>
        <Link href="/" passHref>
          <Button colorScheme="gray" width="full">
            Back
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}