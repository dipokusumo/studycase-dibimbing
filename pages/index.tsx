import { VStack, Box, Heading, Text, Grid, GridItem, Flex, Button, Spacer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NoteList from '../component/NoteList';
import Layout from '../component/Layout';
import Link from 'next/link';

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    }
    fetchNotes();
  }, []);

  return (
    <Layout>
      {/* Container Box for the entire content */}
      <Box maxW="1200px" mx="auto" mt={10} p={6} bg="white" borderRadius="lg" shadow="lg">
        
        {/* Navbar Section */}
        <Flex as="nav" bg="blue.600" color="white" p={4} borderRadius="lg" align="center" shadow="md" mb={6}>
          <Box>
            <Heading size="md">My Notes</Heading>
          </Box>
          <Spacer />
          <Link href="/notes/add" passHref>
            <Button colorScheme="blue" variant="outline">
              Add Note
            </Button>
          </Link>
        </Flex>

        {/* Main Content */}
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" color="blue.600">
              My Notes
            </Heading>
            <Text fontSize="lg" color="blue.400" mt={2}>
              Your personal note-taking app
            </Text>
          </Box>

          <NoteList notes={notes} />
        </VStack>
      </Box>
    </Layout>
  );
}