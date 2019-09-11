import React from 'react';

import venLogoBlue from '../assets/is-logo-blue.svg';

export default () => {
	return (
		<div className="loader">
			<img className="loader-animation" src={venLogoBlue} alt="" />
		</div>
	);
};
