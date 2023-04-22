import React, { useRef, useState } from 'react';
import Image from 'next/image';
import AlarmIcon from '@/app.modules/assets/header/alarm.svg';
import UserIcon from '@/app.modules/assets/header/user.svg';
import MenuIcon from '@/app.modules/assets/header/hamburger.svg';
import RouteModal from './Modal/RouteModal';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import Link from 'next/link';

export default function Header() {
	const dropDownRef = useRef<HTMLImageElement>(null);
	// const [isOpen, setIsOpen] = useDetectClose(dropDownRef, [false, false]);
	const [isOpenSideMenu, setIsOpenSideMenu] = useState<boolean>(false);
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

	const handleClickOfSideMenu = () => setIsOpenSideMenu(!isOpenSideMenu);

	return (
		<header className="fixed left-0 right-0 top-0 z-[999]  bg-yellow-500 ">
			<div className="h-[8.6rem]  px-[2rem] pc:px-0 w-screen pc:min-w-[120rem]  pc:max-w-[120rem] mx-auto bg-blue-500 flex justify-between  items-center">
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
				<div className="hidden pc:flex w-full items-center justify-between  ">
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
					<div className="flex space-x-[3.5rem] items-center  z-[1]" ref={dropDownRef}>
						<div className="relative">
							<AlarmIcon />
							{/*<RouteModal title="알림" isOpen={false} setIsOpen={() => null} /> */}
						</div>

						<div className="relative">
							<Link href={SERVICE_URL.mypage}>
								<UserIcon />
								{/*<RouteModal title="로그인 관리" isOpen={false} setIsOpen={() => null} /> */}
							</Link>
						</div>
					</div>
				</div>

				<div className="block pc:hidden">
					<button type="button" onClick={handleClickOfSideMenu} aria-label={isOpenSideMenu ? '메뉴 닫기' : '메뉴 열기'}>
						<Image alt="" src="/images/header/hamburger.png" width={16} height={12} className="min-w-[1.6rem]" />
					</button>
				</div>

				{isOpenSideMenu && <div aria-expanded={isOpenSideMenu} aria-hidden={isOpenSideMenu} />}
			</div>
		</header>
	);
}

/*


	<div className="mr-[14.9rem] h-full flex items-center">
					<Link className="logo-link" href={SERVICE_URL.home}>
						<ServiceLogo className="pc:w-[15.7rem] w-[11.2rem]" />
					</Link>
				</div>
				<div className="flex items-center justify-between space-x-[32.6rem] ">
					<nav className="hidden pc:block ">
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
					<div className="hidden  pc:flex space-x-[3.5rem] items-center  z-[1]" aria-hidden ref={dropDownRef}>
						<div className="relative">
							<AlarmIcon />
							<RouteModal title="알림" isOpen={false} setIsOpen={() => null} />
						</div>

						<div className="relative">
							<Link href={SERVICE_URL.login}>
								<UserIcon />
								<RouteModal title="로그인 관리" isOpen={false} setIsOpen={() => null} />
							</Link>
						</div>
					</div>
				</div>

				<div className="block pc:hidden min-w-[1.6rem] min-h-[1.2rem] ">
					<button type="button" onClick={handleClickOfSideMenu} aria-label={isOpenSideMenu ? '메뉴 닫기' : '메뉴 열기'}>
						<MenuIcon />
					</button>
				</div>

				{isOpenSideMenu && <div aria-expanded={isOpenSideMenu} aria-hidden={isOpenSideMenu} />}


*/
