// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import addProfile from './mutation/addProfile';
import addressLinkConfirm from './mutation/addressLinkConfirm';
import addressLinkStart from './mutation/addressLinkStart';
import addressLogin from './mutation/addressLogin';
import addressLoginStart from './mutation/addressLoginStart';
import addressSignupConfirm from './mutation/addressSignupConfirm';
import addressSignupStart from './mutation/addressSignupStart';
import addressUnlink from './mutation/addressUnlink';
import changeAbout from './mutation/changeAbout';
import changeEmail from './mutation/changeEmail';
import changeNotificationPreference from './mutation/changeNotificationPreference';
import changePassword from './mutation/changePassword';
import changeUsername from './mutation/changeUsername';
import createPostConfirm from './mutation/createPostConfirm';
import createPostStart from './mutation/createPostStart';
import createProposalTracker from './mutation/createProposalTracker';
import deleteAccount from './mutation/deleteAccount';
import editPostConfirm from './mutation/editPostConfirm';
import editPostStart from './mutation/editPostStart';
import login from './mutation/login';
import logout from './mutation/logout';
import markUserNotification from './mutation/markUserNotification';
import multisigLinkConfirm from './mutation/multisigLinkConfirm';
import multisigLinkStart from './mutation/multisigLinkStart';
import postSubscribe from './mutation/postSubscribe';
import postUnsubscribe from './mutation/postUnsubscribe';
import reportContent from './mutation/reportContent';
import requestResetPassword from './mutation/requestResetPassword';
import resendVerifyEmailToken from './mutation/resendVerifyEmailToken';
import resetPassword from './mutation/resetPassword';
import setCredentialsConfirm from './mutation/setCredentialsConfirm';
import setCredentialsStart from './mutation/setCredentialsStart';
import setDefaultAddress from './mutation/setDefaultAddress';
import signup from './mutation/signup';
import undoEmailChange from './mutation/undoEmailChange';
import updateProposalTracker from './mutation/updateProposalTracker';
import verifyEmail from './mutation/verifyEmail';
import about from './query/about';
import profile from './query/profile';
import subscription from './query/subscription';
import token from './query/token';
import user from './query/user';
import userDetails from './query/userDetails';
import userNotifications from './query/userNotifications';
import userWithUsername from './query/userWithUsername';

export default {
	Mutation: {
		addProfile,
		addressLinkConfirm,
		addressLinkStart,
		addressLogin,
		addressLoginStart,
		addressSignupConfirm,
		addressSignupStart,
		addressUnlink,
		changeAbout,
		changeEmail,
		changeNotificationPreference,
		changePassword,
		changeUsername,
		createPostConfirm,
		createPostStart,
		createProposalTracker,
		deleteAccount,
		editPostConfirm,
		editPostStart,
		login,
		logout,
		markUserNotification,
		multisigLinkConfirm,
		multisigLinkStart,
		postSubscribe,
		postUnsubscribe,
		reportContent,
		requestResetPassword,
		resendVerifyEmailToken,
		resetPassword,
		setCredentialsConfirm,
		setCredentialsStart,
		setDefaultAddress,
		signup,
		undoEmailChange,
		updateProposalTracker,
		verifyEmail
	},
	Query: {
		about,
		profile,
		subscription,
		token,
		user,
		userDetails,
		userNotifications,
		userWithUsername
	}
};
