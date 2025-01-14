// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable sort-keys */
import styled from '@xstyled/styled-components';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGov1PostsCount from 'src/hooks/useGov1PostsCount';
import CountBadgePill from 'src/ui-components/CountBadgePill';

import AllPostsTable from './AllPostsTable';
import BountyPostsTable from './BountyPostsTable';
import DiscussionPostsTable from './DiscussionPostsTable';
import MotionPostsTable from './MotionPostsTable';
import ProposalPostsTable from './ProposalPostsTable';
import ReferendaPostsTable from './ReferendaPostsTable';
import TipPostsTable from './TipPostsTable';
import TreasuryPostsTable from './TreasuryPostsTable';

const LatestActivity = ({ className }: {className?:string}) => {

	const [currentTab, setCurrentTab] = useState('all');

	const {
		allPostsCount,
		discussionsCount,
		proposalsCount,
		referendaCount,
		motionsCount,
		treasuryCount,
		bountiesCount,
		tipsCount
	} = useGov1PostsCount();

	const tabItems = [
		{ label: <CountBadgePill label='All' count={allPostsCount} />,
			key: 'all',
			children: <AllPostsTable />
		},
		{ label: <CountBadgePill label='Discussions' count={discussionsCount} />,
			key: 'discussions',
			children: <DiscussionPostsTable />
		},
		{ label: <CountBadgePill label='Proposals' count={proposalsCount} />,
			key: 'proposals',
			children: <ProposalPostsTable />
		},
		{ label: <CountBadgePill label='Referenda' count={referendaCount} />,
			key: 'referenda',
			children: <ReferendaPostsTable />
		},
		{ label: <CountBadgePill label='Motions' count={motionsCount} />,
			key: 'motions',
			children: <MotionPostsTable />
		},
		{ label: <CountBadgePill label='Treasury Proposals' count={treasuryCount} />,
			key: 'treasury-proposals',
			children: <TreasuryPostsTable />
		},
		{ label: <CountBadgePill label='Bounties' count={bountiesCount} />,
			key: 'bounties',
			children: <BountyPostsTable />
		},
		{ label: <CountBadgePill label='Tips' count={tipsCount} />,
			key: 'tips',
			children: <TipPostsTable />
		}
	];

	return (
		<div className={`${className} bg-white drop-shadow-md p-4 lg:p-6 rounded-md`}>
			<div className="flex justify-between items-center">
				<h2 className='dashboard-heading mb-6'>Latest Activity</h2>
				{currentTab !== 'all' && <Link className='text-sidebarBlue font-medium hover:text-pink_primary py-0.5 px-2 rounded-lg' to={`/${currentTab}`}>View all</Link>}
			</div>
			<Tabs
				className='ant-tabs-tab-bg-white text-sidebarBlue font-medium'
				type="card"
				items={tabItems}
				onChange={(key) => setCurrentTab(key)}
			/>
		</div>
	);
};

export default styled(LatestActivity)`
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
`;