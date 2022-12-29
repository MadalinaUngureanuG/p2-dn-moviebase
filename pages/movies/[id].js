import {
  Badge,
  Box,
  Center,
  CircularProgress, Heading,
  HStack,
  Stack,
  Tag,
  Text,
  VStack
} from "@chakra-ui/react";
import HistoryButton from "components/HistoryButton";
import Layout from "components/Layout";
import MovieReviews from "components/MovieReviews";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import AddToWatchListButton from "./../../components/AddToWatchlistButton";

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (data.success === false) {
    return <Text color="red">{data.status_message}</Text>;
  }
  return (
    <VStack>
    <Stack direction={["column", "row"]} spacing={4} mb="3rem">
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton movieId={id} />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, "w300")}
          alt="Movie poster"
          width="300"
          height="450"
          unoptimized
        />
             <AddToWatchListButton />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map(genre=>
              <Badge key={genre.id} colorScheme="purple" variant="outline">
                 {genre.name}
            </Badge>
          )}
        </Stack>
        <Box>{data.overview}</Box>
      </Stack>
    </Stack>
    <Stack  direction={["column", "column"]} w="full">
      <Box w="full">
       <MovieReviews />
        </Box>
      </Stack>
    </VStack>
  );
};

export default function Movie() {
  return (
    <Layout>
       <MovieContent />
    </Layout>
  );
}
