// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import { Link } from 'react-router-dom';
import CouncilMembersCard from 'src/components/CouncilMembersCard';

interface Props {
  className?: string
  data: string[]
  prime: string
}

const FellowshipMembersListing = ({ className, data, prime } : Props) => {

	return (
		<div className={`${className} motions__list`}>
			{data.map(
				(member) => (
					<div key={member} className='my-5'>
						{<Link to={`/profile/${member}?council=true`}>
							<CouncilMembersCard
								data={member}
								prime={prime}
							/>
						</Link>}
					</div>
				)
			)}
		</div>
	);
};

export default FellowshipMembersListing;