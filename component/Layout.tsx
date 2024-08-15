import { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container maxW="container.md" p={4}>
      {children}
    </Container>
  );
}