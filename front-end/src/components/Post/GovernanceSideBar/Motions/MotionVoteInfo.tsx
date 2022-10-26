// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { useEffect, useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import HelperTooltip from 'src/ui-components/HelperTooltip';
import getNetwork from 'src/util/getNetwork';

import { CouncilVote, Vote } from '../../../../types';
import Address from '../../../../ui-components/Address';
import Card from '../../../../ui-components/Card';

interface Props {
	className?: string
	motionId: number
}

const MotionVoteInfo = ({ className, motionId }: Props) => {
	const [councilVotes, setCouncilVotes] = useState<CouncilVote[]>([]);

	useEffect(() => {
		// eslint-disable-next-line quotes
		fetch(`https://${getNetwork()}.api.subscan.io/api/scan/council/proposal`, { body: JSON.stringify({ proposal_id: motionId }), method: 'POST' }).then(async (res) => {
			try {
				const response = await res.json();
				const info = response?.data?.info;
				if (info) {
					const councilVotes: CouncilVote[] = [];

					info.votes.forEach((vote: any) => {
						councilVotes.push({
							address: vote?.account?.address || '',
							vote: vote?.passed ? Vote.AYE : Vote.NAY
						});
					});

					setCouncilVotes(councilVotes);
				}
			} catch (error) {
				console.error(error);
			}
		}).catch((error) => {
			console.error(error);
		});
	},[motionId]);

	if (!councilVotes.length) {
		return null;
	}

	return (
		<Card className={className}>
			<h3>Council Votes <HelperTooltip content='This represents the onchain votes of council members'/></h3>
			<Grid className='council-votes'>
				{councilVotes.map(councilVote =>
					<Grid.Row key={councilVote.address}>
						<Grid.Column width={12}>
							<div className='item'>
								<Address address={councilVote.address} />
							</div>
						</Grid.Column>
						<Grid.Column width={4}>
							{councilVote.vote === Vote.AYE ? <>
								<div className='thumbs up'>
									<Icon name='thumbs up' />
								</div> Aye
							</> : <>
								<div className='thumbs down'>
									<Icon name='thumbs down' />
								</div> Nay
							</>}
						</Grid.Column>
					</Grid.Row>
				)}
			</Grid>
		</Card>
	);
};

export default styled(MotionVoteInfo)`
	.council-votes {
		margin-top: 2em;
	}
	.thumbs {
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		color: white;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		font-size: 1rem;
	}

	.thumbs.up {
		background-color: green_primary;
	}

	.thumbs.down {
		background-color: red_primary;
	}
`;
