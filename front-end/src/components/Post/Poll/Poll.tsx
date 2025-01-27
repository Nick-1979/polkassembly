// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { QueryLazyOptions } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import ErrorAlert from 'src/ui-components/ErrorAlert';

import { UserDetailsContext } from '../../../context/UserDetailsContext';
import { Exact, usePollVotesLazyQuery } from '../../../generated/graphql';
import { Vote } from '../../../types';
import CouncilSignals from './CouncilSignals';
import GeneralSignals from './GeneralSignals';

interface Props {
	pollId: number
	endBlock: number
	canEdit: boolean
	pollRefetch: (options?: QueryLazyOptions<Exact<{
		postId: number;
	}>> | undefined) => void
}

const Poll = ({ pollId, endBlock, canEdit, pollRefetch }: Props) => {
	const { id } = useContext(UserDetailsContext);
	const [refetch, { data, error }] = usePollVotesLazyQuery({ variables: { pollId } });
	useEffect(() => {
		refetch();
	}, [refetch]);

	let ayes = 0;
	let nays = 0;
	let ownVote: Vote | null = null;

	data?.poll_votes?.forEach(({ vote, voter }) => {
		if (voter?.id === id) {
			ownVote = vote;
		}
		if (vote === Vote.AYE) {
			ayes++;
		}
		if (vote === Vote.NAY) {
			nays++;
		}
	});

	if (error?.message) return <ErrorAlert errorMsg={error.message} />;

	return (
		<>
			<GeneralSignals
				ayes={ayes}
				endBlock={endBlock}
				nays={nays}
				ownVote={ownVote}
				pollId={pollId}
				canEdit={canEdit}
				pollRefetch={pollRefetch}
				votesRefetch={refetch}
			/>
			<CouncilSignals data={data} endBlock={endBlock} />
		</>
	);
};

export default Poll;
