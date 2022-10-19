// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import AuthService from '../../services/auth';
import { Context, MessageType, UpdateUserNotificationArgs } from '../../types';
import getTokenFromReq from '../../utils/getTokenFromReq';

export default async (
	parent: void,
	{
		id
	}: UpdateUserNotificationArgs,
	ctx: Context): Promise<MessageType> => {
	const authServiceInstance = new AuthService();
	const token = getTokenFromReq(ctx.req);

	await authServiceInstance.MarkUserNotificationAsRead(
		id,
		token
	);

	return { message: 'Status updated successfully' };
};
