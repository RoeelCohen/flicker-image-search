import React from 'react';

export default function ImageViewer({ imageSource, onCloseIvClicked }) {
	return (
		<div className="image-viewer" onClick={onCloseIvClicked}>
			<img className="image-viewer-content" src={imageSource} alt="" />
		</div>
	);
}
