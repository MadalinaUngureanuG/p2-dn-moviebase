import Layout from 'components/Layout';
import PopularMoviesOnHomepage from 'components/PopularMoviesOnHomepage';
import TopRatedMoviesOnHomepage from 'components/TopRatedMoviesOnHomepage';
import UpcomingMoviesOnHomepage from 'components/UpcomingMoviesOnHomepage';

export default function HomePage() {
	return (
		<Layout title="Moviebase">
			<PopularMoviesOnHomepage />
			<TopRatedMoviesOnHomepage />
			<UpcomingMoviesOnHomepage />
		</Layout>
	);
}
