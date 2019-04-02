import { IMAGES_SEARCH, IMAGES_SEARCH_FAILED } from '../actions/types';

const initialState = {
	searchTerm: '',
	images: [],
	pages: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case IMAGES_SEARCH:
			const { searchTerm, images = [], page = 1 } = action.payload;

			if (searchTerm !== state.searchTerm) {
				// new search.
				return Object.assign({}, state, { searchTerm, images, pages: [page] });
			}

			if (searchTerm === state.searchTerm && !state.pages.includes(page)) {
				// same search, new page -> add results.

				const concatPages = [...state.pages, page];
				const concatImages = state.images.concat(images);
				return Object.assign({}, state, { images: concatImages, pages: concatPages });
			}

			return state;

		case IMAGES_SEARCH_FAILED:
			// add error to state update ui accordongly let the user know something happened.
			return state;

		default:
			return state;
	}
};
