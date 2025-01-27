// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Button } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DiscussionsContainer from 'src/components/Listing/Discussions/DiscussionsContainer';
import { UserDetailsContext } from 'src/context/UserDetailsContext';

const Discussions = () => {
	const { id } = useContext(UserDetailsContext);

	return (
		<>
			<div className='w-full flex flex-col sm:flex-row sm:items-center'>
				<h1 className='dashboard-heading flex-1 mb-4 sm:mb-0'>Discussions</h1>
				<Link to="/post/create" >
					<Button disabled={!id} type={!id ? 'primary': 'default'} className={`flex items-center justify-center ${id && 'bg-pink_primary hover:bg-pink_secondary text-white transition-colors duration-300'} h-[40px] md:h-[69px] w-full rounded-md`}>Add New Post</Button>
				</Link>
			</div>

			{/* Intro and Create Post Button */}
			<div className='mt-8'>
				<p className="text-sidebarBlue text-sm md:text-base font-medium bg-white p-4 md:p-8 rounded-md w-full shadow-md mb-4">
					This is the place to discuss all things polkadot. Anyone can start a new discussion.
				</p>
			</div>

			<DiscussionsContainer className='mt-8' />
		</>
	);
};

export default Discussions;