// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable sort-keys */
import styled from '@xstyled/styled-components';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DiscussionPostsTable from 'src/components/Home/LatestActivity/DiscussionPostsTable';
import { trackInfo } from 'src/global/post_trackInfo';
import useGov1PostsCount from 'src/hooks/useGov1PostsCount';
import useGov2PostsCount from 'src/hooks/useGov2PostsCount';
import CountBadgePill from 'src/ui-components/CountBadgePill';

import AllGov2PostsTable from './AllGov2PostsTable';
import TrackPostsTable from './TrackPostsTable';

const Gov2LatestActivity = ({ className }: {className?:string}) => {
	const [currentTab, setCurrentTab] = useState('all');
	const { discussionsCount } = useGov1PostsCount();
	const gov2Counts = useGov2PostsCount();

	const tabItems = [
		{ label: 'All', key: 'all', children: <AllGov2PostsTable /> },
		{ label: <CountBadgePill label='Discussions' count={discussionsCount} />,
			key: 'discussions',
			children: <DiscussionPostsTable />
		}
	];

	for (const trackName of Object.keys(trackInfo)) {
		tabItems.push({
			label: <CountBadgePill label={trackName.split(/(?=[A-Z])/).join(' ')} count={gov2Counts[trackName]} />,
			key: trackName.split(/(?=[A-Z])/).join('-').toLowerCase(),
			children: <TrackPostsTable trackNumber={trackInfo[trackName].trackId} />
		});
	}

	return (
		<div className={`${className} bg-white drop-shadow-md p-2 lg:p-6 rounded-md`}>
			<div className="flex justify-between items-center">
				<h2 className='dashboard-heading mb-6'>Latest Activity</h2>
				{currentTab !== 'all' && <Link className='text-sidebarBlue font-medium hover:text-pink_primary py-0.5 px-2 rounded-lg' to={`/${currentTab}`}>View all</Link>}
			</div>
			<Tabs
				type="card"
				items={tabItems}
				className='ant-tabs-tab-bg-white text-sidebarBlue font-medium'
				onChange={(key) => setCurrentTab(key)}
			/>
		</div>
	);
};

export default React.memo(styled(Gov2LatestActivity)`
	th {
		color: nav_link !important;
	}

	td.ant-table-cell {
		color: nav_blue !important;
	}

	tr:nth-child(2n) td {
    background-color: #fbfbfb !important;
	}

	tr {
		cursor: pointer !important;
	}

	.ant-tabs-tab-bg-white .ant-tabs-tab:not(.ant-tabs-tab-active) {
		background-color: white;
		border-top-color: white;
		border-left-color: white;
		border-right-color: white;
		border-bottom-color: #E1E6EB;
	}

	.ant-tabs-tab-bg-white .ant-tabs-tab-active{
		border-top-color: #E1E6EB;
		border-left-color: #E1E6EB;
		border-right-color: #E1E6EB;
		border-radius: 6px 6px 0 0 !important;
	}
	
	.ant-tabs-tab-bg-white .ant-tabs-nav:before{
		border-bottom: 1px solid #E1E6EB;
	}
`);