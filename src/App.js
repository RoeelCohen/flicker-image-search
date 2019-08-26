import React, { Component } from 'react';
import './style/app.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import ImagesGallery from './components/ImagesGallery';
import Camera from './components/Camera'

class App extends Component {

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path={'/'} component={Main}/>
						<Route exact path={'/gallery'} component={ImagesGallery} />
						<Route exact path={'/settings'} component={ImagesGallery} />
						<Route exact path={'/camera'} component={Camera} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
