import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
    return (
        <div className={'main-page-container'}>
            <div className={'link'}>
                <Link  to="/Gallery">Gallery</Link>
            </div>
            <div className={'link'}>
                <Link className={'link'} to="/Settings">Settings</Link>
            </div>
            <div className={'link'}>
                <Link className={'link'} to="/camera">Settings</Link>
            </div>
        </div>
    )
}
