import React, {Fragment} from 'react'
import isLogoBlue from '../assets/is-logo-blue.svg';

export default function Animations() {
    
    const count = 100;
    const arr = [...Array(count)];

    

    return (
        <Fragment>
            {arr.map((e, i) => <img className="coin-flip" src={isLogoBlue} key={i} alt=""/>)}
        </Fragment>
    )
}
