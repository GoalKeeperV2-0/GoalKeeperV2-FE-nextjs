import React from 'react';
import HomeBanner1 from '@/app.modules/assets/banners/home1.svg';
import { CertDataType } from '@/app.features/Certification/types';
import Link from 'next/link';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import CertBox from '@/app.components/Box/CertBox';
import Image from 'next/image';

interface Props {
	certs: CertDataType[];
	alreadyVerification: number[];
}
function HomeScreen({ certs, alreadyVerification }: Props) {
	return (
		<>
			<section className="">
				<Image
					src={'/images/home/BN.svg'}
					alt={'Welcome! 골키퍼를 소개할게요'}
					width={892}
					height={269}
					className="w-full"
				/>
			</section>

			<section className="mt-[3rem] space-y-[3rem]">
				<div className="flex  justify-between items-center">
					<h3>목표 인증</h3>
					<Link href={SERVICE_URL.certifications}>
						<span className="pc:text-body6-pc text-primaryBlack-200">더보기</span>
					</Link>
				</div>
				<ul className="grid grid-cols-3 gap-[3rem]">
					{certs?.map((cert, index) => (
						<li key={index}>
							<CertBox certData={cert} alreadyVerified={alreadyVerification.includes(cert.id)} />
						</li>
					))}
				</ul>
			</section>
		</>
	);
}

export default HomeScreen;
