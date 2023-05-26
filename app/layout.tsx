import '@/styles/globals.css';
import '@/styles/tailwind.css';
//import Aside from '@/app.components/App.base/Aside';

import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';

import { useRouter } from 'next/navigation';
import React from 'react';
import Aside from './Aside';
import Header from './Header';

export const metadata = {
	title: '골키퍼',
	description: '모두의 목표 지킴이 골키퍼!',
};

const ASIDE_NOT_INCLUDE = [SERVICE_URL.login, SERVICE_URL.signUp, SERVICE_URL.oauth2Register];
export default function RootLayout({ children }: { children: React.ReactNode }) {
	//const router = useRouter();
	return (
		<html lang="ko">
			<div className="pc:min-w-[120rem]  pc:w-[120rem] pc:max-w-[120rem] mx-auto ">
				<Header />
				<div className=" pc:py-[7rem] px-[2rem] pc:px-0  flex pc:space-x-[3rem]">
					<Aside />
					<main className="w-full pc:min-w-[89.2rem pc:w-[89.2rem]">{children}</main>
				</div>
			</div>
		</html>
	);
}
