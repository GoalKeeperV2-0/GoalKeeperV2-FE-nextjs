'use client';
import React, { useState } from 'react';
import Image from 'next/image';
function MobileMenu() {
	const [isOpenSideMenu, setIsOpenSideMenu] = useState<boolean>(false);
	const handleClickOfSideMenu = () => setIsOpenSideMenu(!isOpenSideMenu);
	return (
		<div className="block pc:hidden">
			<button type="button" onClick={handleClickOfSideMenu} aria-label={isOpenSideMenu ? '메뉴 닫기' : '메뉴 열기'}>
				<Image
					alt=""
					src="/images/header/hamburger.png"
					width={16}
					height={12}
					className="min-w-[1.6rem] mb-[0.3rem]"
				/>
			</button>
		</div>
	);
}

export default MobileMenu;
