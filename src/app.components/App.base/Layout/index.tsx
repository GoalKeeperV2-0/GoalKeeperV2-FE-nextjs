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
			<div className="pc:min-w-[120rem] pc:w-[120rem] pc:max-w-[120rem] mx-auto ">
				<Header />
				<div className="pt-[3.3rem] py-[1.5rem] pc:py-[7rem]  flex space-x-[3rem]">
					<Aside />
					<main className="pc:min-w-[89.2rem pc:w-[89.2rem]">{children}</main>
				</div>
			</div>
		</>
	);
}
