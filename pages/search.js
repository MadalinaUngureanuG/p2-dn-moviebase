import { SearchIcon, StarIcon } from '@chakra-ui/icons';
import {
  Badge, Button, Container, IconButton, Input, InputGroup,
  InputRightElement, ListItem,
  Progress,
  Text, UnorderedList, VStack
} from '@chakra-ui/react';
import Layout from 'components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}

function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <UnorderedList spacing={2}>
      {data.results.map(({ id, title, release_date, vote_average}) => (
        <ListItem key={id} mt="1rem">
          <Link href={`/movies/${id}`} passHref legacyBehavior >
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge fontSize="sm">Rating: {vote_average} <StarIcon color="yellow.600" fontSize="sm" mb="5px"/> </Badge>} 
            >
              <Text as="span" fontSize="2xl" color="teal.400">{title}</Text>
            </Button>
          </Link>
        </ListItem>
      ))}
  </UnorderedList>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
