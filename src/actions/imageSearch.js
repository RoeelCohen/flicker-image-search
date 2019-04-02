import { IMAGES_SEARCH, IMAGES_SEARCH_FAILED } from './types';
import { searchImages } from '../api/gallery';

export const searchImagesAction = (text, page, perPage) => {
	return async dispatch => {
		const response = await searchImages(text, page, perPage);
		if (response.photo) {
			dispatch(imagesLoaded(text, response.photo, page));
		} else {
			dispatch(imageSearchFailed(response.error));
		}
	};
};

const imagesLoaded = (searchTerm, images, page) => ({
	type: IMAGES_SEARCH,
	payload: {
		searchTerm,
		images,
		page,
		timestamp: Date.now()
	}
});

// added for future use.. show the user something happened
const imageSearchFailed = error => ({
	type: IMAGES_SEARCH_FAILED,
	payload: {
		error,
		timestamp: Date.now()
	}
});
