import { oauth2 } from '@/app.modules/api/auth';
import client from '@/app.modules/api/client';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import { setCookie } from '@/app.modules/cookie';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Oauth2CallbackPage() {
	const router = useRouter();
	const { data } = useQuery(
		['oauth2', 'google'],
		() => oauth2(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				const { accessToken, refreshToken, newbie } = res;
				console.log(res);
				setCookie('GRT', refreshToken, { path: '/', secure: true, sameSite: 'none' });
				setCookie('GAT', accessToken, { path: '/', secure: true, sameSite: 'none' });
				client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
				// TODO: 필수 입력 정보 입력안했을때 보내는페이지
				if (newbie) {
					router.push(`${SERVICE_URL.oauth2Register}`);
					return;
				}
				router.push(SERVICE_URL.home); // TODO: 로그인 이전 페이지로 보내기
			},
			onError: () => {
				alert('오류 발생');
			},
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		console.log('인가코드 : ', new URL(document.location.toString()).searchParams.get('code') as string);
	}, []);
	return <div>OauthCallback</div>;
}

export default Oauth2CallbackPage;
