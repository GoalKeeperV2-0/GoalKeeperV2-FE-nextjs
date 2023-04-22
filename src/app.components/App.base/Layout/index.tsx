import Aside from '@/app.components/Aside';
import Header from '@/app.components/Header';
import ModalSection from '@/app.components/Modal/ModalSection';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import { modalState } from '@/app.modules/store/modal';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';

interface Props {
	children: React.ReactNode;
}
const ASIDE_NOT_INCLUDE = [SERVICE_URL.login, SERVICE_URL.signUp, SERVICE_URL.oauth2Register];
export default function Layout({ children }: Props) {
	const [modal, setModal] = useRecoilState(modalState);
	const router = useRouter();
	return (
		<>
			<Header />
			<div className=" box-border  w-screen pc:min-w-[120rem] pc:w-[120rem] pc:max-w-[120rem] h-screen  mx-auto  bg-green-500 pt-[3.3rem] pc:pt-[15.6rem] flex space-x-[3rem]">
				<aside className=" h-fit w-[27.8rem]   rounded-[1.6rem] p-[2.4rem] border-[0.1rem] border-borderGray  bg-white space-y-[2rem]">
					aisde
				</aside>
				<main className="bg-purple-500 w-[89.2rem]">main</main>
			</div>
		</>
	);
}
//
/*
<Aside />
				<main className="w-full">{children}</main>

	{modal.isOpen && <ModalSection />}

*/
