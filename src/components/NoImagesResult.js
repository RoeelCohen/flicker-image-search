import React from 'react';

import emptySearch from '../assets/empty-search.svg';

export default function NoImagesResult() {
	return (
		<div className="no-images">
			<img className="no-images-drawing" src={emptySearch} alt="" />
			<div className="no-images-text">No Images to show.. Search something</div>
		</div>
	);
}
