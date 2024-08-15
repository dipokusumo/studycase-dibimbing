import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EditNoteForm from '../../component/EditNoteForm';
import Layout from '../../component/Layout';
import { Box, Heading, Spinner } from '@chakra-ui/react';

export default function EditNotePage() {
  const [note, setNote] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchNote() {
      const response = await fetch(`/api/notes/${id}`);
      const data = await response.json();
      setNote(data);
    }
    if (id) fetchNote();
  }, [id]);

  return (
    <Layout>
      <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg" shadow="lg" bg="white">
        {note ? <EditNoteForm note={note} /> : <Spinner />}
      </Box>
    </Layout>
  );
}