// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable sort-keys */
import { Tabs } from 'antd';
import React from 'react';

import TrackListingAllTabContent from './TrackListingAllTabContent';
import TrackListingStatusTabContent from './TrackListingStatusTabContent';

interface Props {
	className?: string;
	trackName: string;
}

const TrackListingCard = ({ className, trackName } : Props) => {

	const items = [
		{ label: 'All', key: 'All', children: <TrackListingAllTabContent trackName={trackName} /> },
		{ label: 'Confirmed', key: 'Confirmed', children: <TrackListingStatusTabContent trackName={trackName} status='Confirmed' /> },
		{ label: 'Cancelled', key: 'Cancelled', children: <TrackListingStatusTabContent trackName={trackName} status='Cancelled' /> },
		{ label: 'Deciding', key: 'Deciding', children: <TrackListingStatusTabContent trackName={trackName} status='Deciding' /> },
		{ label: 'Killed', key: 'Killed', children: <TrackListingStatusTabContent trackName={trackName} status='Killed' /> },
		{ label: 'Submitted', key: 'Submitted', children: <TrackListingStatusTabContent trackName={trackName} status='Submitted' /> },
		{ label: 'Rejected', key: 'Rejected', children: <TrackListingStatusTabContent trackName={trackName} status='Rejected' /> },
		{ label: 'Timed Out', key: 'Timedout', children: <TrackListingStatusTabContent trackName={trackName} status='Timedout' /> }
	];

	return (
		<div className={`${className} bg-white drop-shadow-md rounded-md p-4 md:p-8 text-sidebarBlue`}>
			<h2 className="text-lg capitalize font-medium mb-10">Referenda</h2>

			<Tabs
				items={items}
				type="card"
				className='ant-tabs-tab-bg-white text-sidebarBlue font-medium'
			/>
		</div>
	);
};

export default TrackListingCard;