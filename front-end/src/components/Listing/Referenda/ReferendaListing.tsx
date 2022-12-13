// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import { Link } from 'react-router-dom';
import GovernanceCard from 'src/components/GovernanceCard';
import { GetLatestReferendaPostsQuery } from 'src/generated/graphql';
import { LoadingState, PostEmptyState } from 'src/ui-components/UIStates';

interface Props {
  className?: string
  data?: GetLatestReferendaPostsQuery
	loading?: boolean
}

const ReferendaListing = ({ className, data, loading } : Props) => {
	if(!data || loading) return <div className={className}><LoadingState /></div>;

	const noPost = !data.posts || !data.posts.length;
	const atLeastOneCurrentReferendum = data.posts.some((post) => {
		if(post.onchain_link?.onchain_referendum.length){
			// this breaks the loop as soon as
			// we find a post that has a referendum.
			return true;
		}
		return false;
	});

	if (noPost || !atLeastOneCurrentReferendum) return <div className={className}><PostEmptyState /></div>;

	return (
		<div className={`${className}`}>
			{data.posts.map(
				(post) => {
					const onchainId = post.onchain_link?.onchain_referendum_id;

					return !!post?.author?.username && !!post.onchain_link?.onchain_referendum.length &&
						<div key={post.id} className='my-5'>
							{<Link to={`/referendum/${onchainId}`}>
								<GovernanceCard
									postReactions={(post as any)?.post_reactions}
									address={post.onchain_link.proposer_address}
									comments={post.comments_aggregate.aggregate?.count
										? post.comments_aggregate.aggregate.count.toString()
										: '0'}
									method={post.onchain_link.onchain_referendum[0]?.preimage?.method}
									onchainId={onchainId}
									status={post.onchain_link.onchain_referendum[0]?.referendumStatus?.[0].status}
									end={post.onchain_link.onchain_referendum[0]?.end}
									title={post.title}
									topic={post.topic.name}
									created_at={post.created_at}
								/>
							</Link>}
						</div>
					;
				}
			)}
		</div>
	);
};

export default ReferendaListing;