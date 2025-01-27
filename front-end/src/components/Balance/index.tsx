// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect, useState } from 'react';
import { useApiContext } from 'src/context';
import formatBnBalance from 'src/util/formatBnBalance';

interface Props {
	address: string
	onChange?: (balance: string) => void
}

const Balance = ({ address, onChange }: Props) => {
	const [balance, setBalance] = useState<string>('0');
	const { api, apiReady } = useApiContext();

	useEffect(() => {
		if (!api || !apiReady || !address) return;

		api.query.system.account(address).then(res => {
			const balanceStr = res?.data?.free?.toString() || '0';
			setBalance(balanceStr);
			if(onChange){
				onChange(balanceStr);
			}
		}).catch(e => console.error(e));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, api, apiReady]);

	return (
		<div className='text-xs ml-auto text-[#53595C]'>
			<span className='font-medium text-[#2E2F30]'>{formatBnBalance(balance, { numberAfterComma: 2, withUnit: true })}</span> available.
		</div>
	);
};

export default Balance;