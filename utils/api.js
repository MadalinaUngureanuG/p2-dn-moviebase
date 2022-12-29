export const fetcher = (...args) => fetch(...args).then(res => res.json());

export const swrOptions = {
	fetcher,
	onError: (error, key) => {
		alert("Sorry,but this request can't be processed");
	}
};

export const buildImageUrl = (path, size = 'original') => `https://image.tmdb.org/t/p/${size}${path}`;
