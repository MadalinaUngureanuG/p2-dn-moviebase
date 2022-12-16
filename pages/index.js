import {
  Center, Heading, SimpleGrid
} from "@chakra-ui/react";
import Layout from "components/Layout";
import MovieCard from "components/MovieCard";
import useSWR from "swr";
import { swrOptions } from "utils/api";

const url = `/api/popular`;

export default function HomePage() {
  const { data, error, isLoading } = useSWR(url, swrOptions.fetcher);

  return (
    <Layout title="Moviebase">
      <Heading size="xl" mb="1rem" mt="3rem" color="orange.500">Popular movies...</Heading>
      <Center h="full">
        <SimpleGrid columns={4} spacing={5} minChildWidth="20%" py={6}>
          {data &&
            data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </SimpleGrid>
      </Center>
    </Layout>
  );
}
