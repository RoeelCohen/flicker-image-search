import React, { Component } from 'react';
import './style/app.scss';

import ImagesGallery from './components/ImagesGallery';

class App extends Component {
	render() {
		return (
			<div className="App">
				<ImagesGallery />
			</div>
		);
	}
}

export default App;
