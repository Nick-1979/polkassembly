// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Form, InputNumber } from 'antd';
import BN from 'bn.js';
import React, { useState } from 'react';
import { chainProperties } from 'src/global/networkConstants';
import getNetwork from 'src/util/getNetwork';

import { inputToBn } from '../util/inputToBn';
import HelperTooltip from './HelperTooltip';

interface Props{
	className?: string
	label?: string
	helpText?: string
	onChange: (balance: BN) => void
	placeholder?: string
	size?: 'large' | 'small' | 'middle'
}

const currentNetwork = getNetwork();

const BalanceInput = ({ className, label = '', helpText = '', onChange, placeholder = '', size }: Props) => {
	const [isValidInput, setIsValidInput] = useState(true);

	const onBalanceChange = (value: number | null): void => {
		if(!value || value <= 0) {
			setIsValidInput(false);
			onChange(new BN(0));
			return;
		}

		const [balance, isValid] = inputToBn(`${value}`, false);
		setIsValidInput(isValid);

		if(isValid){
			onChange(balance);
		}
	};

	return <div className={className}>
		<label className='mb-2 flex items-center text-sm text-sidebarBlue'> {label} {helpText && <HelperTooltip className='ml-2' text={helpText}/> } </label>

		<Form.Item
			name="balance"
			rules={[{ required: true }]}
			validateStatus={isValidInput ? 'success' : 'error'}
			help={!isValidInput && 'Please input a valid value'}
		>
			<InputNumber
				className='text-sm text-sidebarBlue w-full px-2 py-1 border-2 rounded-md'
				onChange={onBalanceChange}
				placeholder={`${placeholder} ${chainProperties[currentNetwork].tokenSymbol}`}
				size={size || 'large'}
			/>
		</Form.Item>
	</div>;
};

export default BalanceInput;
