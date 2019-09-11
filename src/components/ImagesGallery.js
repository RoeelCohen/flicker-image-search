import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import { DEFAULT_IMAGES_PER_PAGE } from '../api/gallery';
import { searchImagesAction } from '../actions/imageSearch';
import Loader from './Loader';
import NoImagesResult from './NoImagesResult';
import QrModal from './QrModal';

export class ImagesGallery extends Component {
  state = {
    searchTerm: '',
    perPage: DEFAULT_IMAGES_PER_PAGE,
    showDialog: false,
    imageSource: ''
  };

  getNextPageNumber = () => {
    return this.props.currentPage + 1;
  };

  hasMore = () => {
    return this.props.hasMore;
  };

  closeImageViewer = () => {
    this.setState({ imageSource: '', showDialog: false });
  };

  renderImages() {
    const { images } = this.props;

    return images.map(image => {
      const { url, farm, server, id } = image;
      return <img className='image three-d-hover' src={url} key={`${farm}${server}${id}`} alt='' onClick={e => this.setState({ showDialog: true, imageSource: url })} />;
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
        <div className='header'>
          <input className='search-bar' type='text' name='query' placeholder='Search pictures pls...' onChange={e => this.handleSearch(e.target.value)} />
        </div>
        {showDialog && <QrModal url={imageSource} onClose={this.closeImageViewer}/>}
        {images.length === 0 && <NoImagesResult />}
        <InfiniteScroll
          className='images-container'
          dataLength={images.length}
          hasMore={this.hasMore()}
          next={() => {
            seacrhImagesbyText(searchTerm, this.getNextPageNumber(), perPage);
          }}
          loader={<Loader />}>
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
  images: state.gallery.images,
  gallery: state.gallery,
  hasMore: state.gallery.page < state.gallery.pages,
  currentPage: state.gallery.page
});

const mapDispatchToProps = {
  seacrhImagesbyText: (text, page, perPage) => searchImagesAction(text, page, perPage)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesGallery);
