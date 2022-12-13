// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ClockCircleOutlined, CommentOutlined, DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React, { useContext } from 'react';
import BlockCountdown from 'src/components/BlockCountdown';
import { UserDetailsContext } from 'src/context/UserDetailsContext';
import { noTitle } from 'src/global/noTitle';
import useCurrentBlock from 'src/hooks/useCurrentBlock';
import OnchainCreationLabel from 'src/ui-components/OnchainCreationLabel';
import StatusTag from 'src/ui-components/StatusTag';
import getRelativeCreatedAt from 'src/util/getRelativeCreatedAt';

function getFormattedLike(v: number) {
	return Intl.NumberFormat('en-US', {
		maximumFractionDigits: 1,
		notation: 'compact'
	}).format(v);
}

interface GovernanceProps {
	postReactions: {
		reaction: string;
	}[];
	address: string
	className?: string
	comments?: string
	created_at?: Date
	end?: number
	method?: string
	onchainId?: string | number | null
	status?: string | null
	tipReason?: string
	title?: string | null
	topic: string
}

const GovernanceCard = function ({
	postReactions,
	address,
	className,
	comments,
	created_at,
	end = 0,
	method,
	onchainId,
	status,
	tipReason,
	title,
	topic
}:GovernanceProps) {
	const currentUser = useContext(UserDetailsContext);
	let titleString = title || method || tipReason || noTitle;

	if(tipReason) {
		const titleTrimmed = titleString.match(/.{1,80}(\s|$)/g)![0];
		titleString = `${titleTrimmed} ${titleTrimmed.length != titleString.length ? '...' : ''}`;
	}

	const mainTitle = <span className={tipReason ? 'tipTitle' : ''}><div>{titleString}</div></span>;
	const subTitle = title && tipReason && method && <h5>{title}</h5>;
	const currentBlock = useCurrentBlock()?.toNumber() || 0;
	const ownProposal = currentUser?.addresses?.includes(address);
	const relativeCreatedAt = getRelativeCreatedAt(created_at);
	const reaction = {
		dislike: 0,
		like: 0
	};
	postReactions?.forEach((postReaction) => {
		if (postReaction?.reaction === '👍') {
			reaction.like++;
		} else if (postReaction?.reaction === '👎') {
			reaction.dislike++;
		}
	});
	return (
		<div className={`${className} ${ownProposal && 'border-l-pink_primary border-l-4'} border-2 border-grey_light hover:border-pink_primary hover:shadow-xl transition-all duration-200 rounded-md p-3 md:p-4`}>
			<div className="flex flex-col justify-between">
				<div className='flex lg:justify-between lg:items-start lg:flex-row flex-col-reverse'>
					<div className='mt-3 lg:mt-0'>
						<h1 className='text-sidebarBlue font-semibold text-sm flex'>
							{!tipReason && <span className='font-medium mr-2'>#{onchainId}</span>} {mainTitle}
						</h1>
						<h2 className='text-navBlue font-medium text-sm'>{subTitle}</h2>
					</div>
					<div className='flex justify-between items-center'>
						{status && <StatusTag status={status}/>}
						{relativeCreatedAt &&
							<div className='flex items-center text-navBlue lg:hidden'>
								<ClockCircleOutlined className='mr-1' /> {relativeCreatedAt}
							</div>}
					</div>
				</div>

				<div className="mt-3 gap-2.5 font-medium text-navBlue text-xs flex flex-col md:flex-row items-start md:items-center">
					<OnchainCreationLabel address={address} topic={topic} />
					<Divider className='hidden md:inline-block' type="vertical" style={{ borderLeft: '1px solid #90A0B7' }} />

					<div className='flex items-center gap-x-2'>
						<div className='flex items-center justify-center gap-x-1.5'>
							<LikeOutlined />
							<span>{getFormattedLike(reaction.like)}</span>
						</div>
						<Divider className='hidden md:inline-block' type="vertical" style={{ borderLeft: '1px solid #90A0B7' }} />
						<div className='flex items-center justify-center gap-x-1.5'>
							<DislikeOutlined />
							<span>{getFormattedLike(reaction.dislike)}</span>
						</div>
						<Divider className='hidden md:inline-block' type="vertical" style={{ borderLeft: '1px solid #90A0B7' }} />
						{comments && <>
							<div className='flex items-center'>
								<CommentOutlined className='mr-1' /> {comments}
							</div>
							<Divider type="vertical" style={{ borderLeft: '1px solid #90A0B7' }} />
						</>}
						{relativeCreatedAt && <>
							<div className='hidden lg:flex items-center'>
								<ClockCircleOutlined className='mr-1' /> {relativeCreatedAt}
							</div>
						</>}
					</div>

					{!!end && !!currentBlock &&
							<div className="flex items-center">
								<Divider className='hidden md:inline-block' type="vertical" style={{ borderLeft: '1px solid #90A0B7' }} />
								<ClockCircleOutlined className='mr-1' />
								{
									end > currentBlock
										? <span><BlockCountdown endBlock={end}/> remaining</span>
										: <span>ended <BlockCountdown endBlock={end}/></span>
								}
							</div>
					}
				</div>
			</div>
		</div>
	);
};

export default GovernanceCard;