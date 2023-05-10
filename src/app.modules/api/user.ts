import client from './client';

export const getUserProfile = async () => {
	console.log('레이아웃 업');
	const res = await client.get(`credential`);

	return res;
};
