import { BASE_URL, DEFAULT_QUERIES, API_KEY } from './constants';

export const DEFAULT_IMAGES_PER_PAGE = 30;
export const DEFAULT_PAGE = 1;

const getSearchURL = (query, page, perPage) => {
	return `${BASE_URL}${DEFAULT_QUERIES}&api_key=${API_KEY}&text=${query}&page=${page}&per_page=${perPage}`;
};

const buildImageURL = (farm, server, id, secret) => {
	return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export const searchImages = async (text, page = DEFAULT_PAGE, perPage = DEFAULT_IMAGES_PER_PAGE) => {
	try {
		const res = await fetch(getSearchURL(text, page, perPage));
		const searchResult = await res.json();

		// we can add aditional api error code handeling
		// error codes 1 - 116 at the bottom of the api page
		// https://www.flickr.com/services/api/flickr.photos.search.html

		searchResult.photos.photo.forEach(image => {
			const { farm, server, id, secret } = image;
			image.url = buildImageURL(farm, server, id, secret);
		});

		// return the whole object just in case we will want other data from the response
		return searchResult.photos;
	} catch (error) {
		return { error: error.message };
	}
};
