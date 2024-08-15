import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NoteDetail from '../../component/NoteDetail';
import Layout from '../../component/Layout';
import { Box, Spinner } from '@chakra-ui/react';

export default function NoteDetailPage() {
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
        {note ? <NoteDetail note={note} /> : <Spinner />}
      </Box>
    </Layout>
  );
}