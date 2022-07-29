import React from 'react';

import { Announcement, Announcements, Slider } from './BannersStyles';

const Banners = () => {
    return (
        <Announcements>
            <Slider>
                <img src="assets/img/not-found.jpg" alt=""/>
            </Slider>
            <Announcement className="announcement1">
                <img src="assets/img/not-found.jpg" alt=""/>
            </Announcement>
            <Announcement className="announcement2">
                <img src="assets/img/not-found.jpg" alt=""/>
            </Announcement>
        </Announcements>
    );
}

export default Banners;