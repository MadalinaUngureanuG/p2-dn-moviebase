import { Center } from "@chakra-ui/react";
import Layout from "components/Layout";
import MovieCard from "components/MovieCard";
import useSWR from "swr";
import { swrOptions } from "utils/api";

const url = `https://api.themoviedb.org/3/movie/popular?api_key=814d059119735875be9188f0a1bf5036&language=en-US&page=1`;

export default function HomePage() {
  const { data, error, isLoading } = useSWR(url, swrOptions.fetcher);

  return (
    <Layout title="Moviebase">
      <Center h="full">
        <ul>
          {data &&
            data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
      </Center>
    </Layout>
  );
}
