import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { swrOptions } from "utils/api";

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref legacyBehavior>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=814d059119735875be9188f0a1bf5036&language=en-US`;
  const { data, error, isLoading } = useSWR(url, swrOptions.fetcher);
  return (
    <Box bg="purple.500">
      <Container>
        <Stack
          as="nav"
          direction={["column", , "row"]}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">Moviebase</Heading>
            </MenuItem>

            <Box display={["block", , "none"]} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={["column", , "row"]}
            justify="start"
            align={["start", , "center"]}
            display={[isOpen ? "flex" : "none", , "flex"]}
            spacing={4}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/" disabled>
              Watchlist
            </MenuItem>
            <MenuItem href="/upcoming">Upcoming</MenuItem>
            <MenuItem href="/top-rated">Top rated</MenuItem>
            <MenuItem href="/" disabled>
              History
            </MenuItem>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Categories
              </MenuButton>
              <MenuList>
                {data &&
                  data.genres.map((category) => (
                    <Stack key={category.id}>
                      <MenuItem href={"/category/" + category.id}>
                        {category.name}
                      </MenuItem>
                      <Divider></Divider>
                    </Stack>
                  ))}
              </MenuList>
            </Menu>
          </Stack>
          <Spacer />
          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <MenuItem href="/" variant="outline" disabled>
              What to watch
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
