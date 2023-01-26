// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext, useEffect, useState } from 'react';
import { AllianceApiContext } from 'src/context/AllianceApiContext';
import { useGetLatestMotionsCountLazyQuery } from 'src/generated/graphql';
import { post_type } from 'src/global/post_types';
import { ErrorState } from 'src/ui-components/UIStates';
import { LoadingState } from 'src/ui-components/UIStates';

import MembersListing from './MembersListing';

const AllianceMembers = ({ className } : { className?:string }) => {
	const { api, apiReady } = useContext(AllianceApiContext);
	const [error, setErr] = useState<Error | null>(null);
	const [fellow, setFellow] = useState<string[]>([]);
	const [ally, setAlly] = useState<string[]>([]);
	const [retiring, setRetiring] = useState<string[]>([]);
	useEffect(() => {
		if (!api) {
			return;
		}

		if (!apiReady) {
			return;
		}

		api.query.alliance.members({ Fellow: true }).then((members) => {
			setFellow(members.toHuman() as string[]);
		}).catch(error => setErr(error));

		api.query.alliance.members({ Ally: true }).then((members) => {
			setAlly(members.toHuman() as string[]);
		}).catch(error => setErr(error));

		api.query.alliance.members({ Retiring: true }).then((members) => {
			setRetiring(members.toHuman() as string[]);
		}).catch(error => setErr(error));

	}, [api, apiReady]);

	const [refetch] = useGetLatestMotionsCountLazyQuery({ variables: {
		postType: post_type.ON_CHAIN
	} });
	useEffect(() => {
		refetch();
	}, [refetch]);

	if (error) {
		return <ErrorState errorMessage={error.message} />;
	}

	return (
		<>
			<div className={`${className} shadow-md bg-white p-3 md:p-8 rounded-md`}>
				<div className='flex items-center justify-between'>
					<h1 className='dashboard-heading'>Fellow</h1>
				</div>

				<MembersListing className='mt-6' data={fellow} prime={''} />
			</div>

			<div className={`${className} shadow-md bg-white p-3 md:p-8 rounded-md`}>
				<div className='flex items-center justify-between'>
					<h1 className='dashboard-heading'>Ally</h1>
				</div>

				<MembersListing className='mt-6' data={ally} prime={''} />
			</div>

			<div className={`${className} shadow-md bg-white p-3 md:p-8 rounded-md`}>
				<div className='flex items-center justify-between'>
					<h1 className='dashboard-heading'>Retiring</h1>
				</div>

				<MembersListing className='mt-6' data={retiring} prime={''} />
			</div>
		</>
	);

	return (
		<div className={className}><LoadingState /></div>
	);

};

export default AllianceMembers;