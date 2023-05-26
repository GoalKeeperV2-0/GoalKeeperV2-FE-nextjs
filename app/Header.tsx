import React from 'react';
import Image from 'next/image';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
	/*const dropDownRef = useRef<HTMLImageElement>(null);
	// const [isOpen, setIsOpen] = useDetectClose(dropDownRef, [false, false]);*/

	const MENU_LIST = [
		{
			title: '공지사항',
			path: SERVICE_URL.announcements,
		},
		{
			title: '목표인증',
			path: SERVICE_URL.certifications,
		},
		{
			title: '커뮤니티',
			path: SERVICE_URL.community,
		},
		{
			title: '목표관리',
			path: SERVICE_URL.manageGoal,
		},
	];

	return (
		<header className="h-[8.6rem]  px-[2rem] pc:px-0 w-full mx-auto flex justify-between  items-center">
			<div className="pc:mr-[14.9rem] h-full flex items-center">
				<Link className="logo-link" href={SERVICE_URL.home}>
					<Image
						alt="홈 바로가기"
						src="/images/header/serviceLogo.png"
						width="210"
						height={34}
						className="min-w-[13rem] w-[13rem] pc:w-[21rem]"
					/>
				</Link>
			</div>
			<div className="hidden pc:flex w-full items-center justify-between">
				<nav>
					<ul className="flex space-x-[3.5rem]">
						{MENU_LIST.map((menu, index): React.ReactElement => {
							return (
								<li key={index} className="font-[600] pc:min-w-[6.5rem]">
									<Link href={menu.path}>{menu.title}</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="flex space-x-[3.5rem] items-center">
					<div className="relative">
						<Image
							alt="알림 확인"
							src="/images/header/alarm.svg"
							width={34}
							height={34}
							className="min-w-[3.4rem] w-[3.4rem]"
						/>

						{/*<RouteModal title="알림" isOpen={false} setIsOpen={() => null} /> */}
					</div>

					<div className="relative">
						<Link href={SERVICE_URL.login}>
							<Image
								alt="내 정보 바로가기"
								src="/images/header/user.svg"
								width={34}
								height={34}
								className="min-w-[3.4rem] w-[3.4rem]"
							/>

							{/*<RouteModal title="로그인 관리" isOpen={false} setIsOpen={() => null} /> */}
						</Link>
					</div>
				</div>
			</div>

			<MobileMenu />

			{/*isOpenSideMenu && <div aria-expanded={isOpenSideMenu} aria-hidden={!isOpenSideMenu} />*/}
		</header>
	);
}
