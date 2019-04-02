import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import { DEFAULT_IMAGES_PER_PAGE } from '../api/gallery';
import { searchImagesAction } from '../actions/imageSearch';
import Loader from './Loader';
import NoImagesResult from './NoImagesResult';
import ImageViewer from './ImageViewer';

export class ImagesGallery extends Component {
	state = {
		searchTerm: '',
		perPage: DEFAULT_IMAGES_PER_PAGE,
		showDialog: false,
		imageSource: ''
	};

	getNextPageNumber = () => {
		const { images } = this.props;
		const { perPage } = this.state;
		return images.length / perPage + 1;
	};

	hasMore = () => {
		const { images } = this.props;
		const { perPage } = this.state;
		return images.length > 0 && images.length % perPage === 0;
	};

	closeImageViewer = () => {
		this.setState({ imageSource: '', showDialog: false });
	};

	renderImages() {
		const { images } = this.props;

		return images.map(image => {
			const { url, farm, server, id } = image;
			return (
				<img
					className="image three-d-hover"
					src={url}
					key={`${farm}${server}${id}`}
					alt=""
					onClick={e => this.setState({ showDialog: true, imageSource: url })}
				/>
			);
		});
	}

	handleSearch = debounce(text => {
		if (text) {
			// check if text is empty to ignore when deleting the whole text
			this.props.seacrhImagesbyText(text);
			this.setState({ searchTerm: text });
		}
	}, 300);

	render() {
		const { images, seacrhImagesbyText } = this.props;
		const { searchTerm, perPage, showDialog, imageSource } = this.state;

		return (
			<div>
				<div className="header">
					<input
						className="search-bar"
						type="text"
						name="query"
						placeholder="Search images..."
						onChange={e => this.handleSearch(e.target.value)}
					/>
				</div>
				{showDialog && (
					<ImageViewer imageSource={imageSource} onCloseIvClicked={this.closeImageViewer} />
				)}
				{images.length === 0 && <NoImagesResult />}
				<InfiniteScroll
					className="images-container"
					dataLength={images.length}
					hasMore={this.hasMore()}
					next={() => {
						seacrhImagesbyText(searchTerm, this.getNextPageNumber(), perPage);
					}}
					loader={<Loader />}
				>
					{this.renderImages()}
				</InfiniteScroll>
			</div>
		);
	}
}

ImagesGallery.defaultProps = {
	images: [],
	seacrhImagesbyText: () => {}
};

const mapStateToProps = state => ({
	images: state.gallery.images
});

const mapDispatchToProps = {
	seacrhImagesbyText: (text, page, perPage) => searchImagesAction(text, page, perPage)
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImagesGallery);
