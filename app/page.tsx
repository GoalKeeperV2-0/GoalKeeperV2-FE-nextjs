import { cookies } from 'next/headers';
import Link from 'next/link';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import Image from 'next/image';
import CertBox from './Box/CertBox';

async function getData() {
	const url = 'https://api.goalkeeper.co.kr/api/certifications?page=0';
	const token = cookies().get('GAT')?.value;
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const res = await fetch(url, { headers });
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function HomePage() {
	// const { data: certs } = useCertList(0);
	const data = await getData();
	//console.dir(data?.data?.certificationResponses?.content);
	const certs = data.data.certificationResponses.content.slice(0, 6);
	const alreadyVerification = data?.data?.alreadyVerification;
	return (
		<>
			<section>
				<Image
					src={'/images/home/BN.svg'}
					alt={'Welcome! 골키퍼를 소개할게요'}
					width={892}
					height={269}
					className="w-full hidden pc:block"
				/>
			</section>
			<section>
				<Image
					src={'/images/home/BNM.svg'}
					alt={'Welcome! 골키퍼를 소개할게요'}
					width={320}
					height={147}
					className="min-w-full w-full pc:hidden"
				/>
			</section>

			<section className="hidden pc:block mt-[3rem] space-y-[3rem]">
				<div className="flex  justify-between items-center">
					<h1 className=" text-title1-mo pc:text-title1-pc">목표 인증</h1>
					<Link href={SERVICE_URL.certifications}>
						<span className="pc:text-body6-pc text-primaryBlack-200">더보기</span>
					</Link>
				</div>
				<ul className="grid grid-cols-3 gap-[3rem]">
					{certs.map((cert: any, index: number) => (
						<li key={index}>
							<CertBox certData={cert} alreadyVerified={alreadyVerification.includes(cert.id)} />
						</li>
					))}
				</ul>
			</section>
			<section className="pc:hidden mt-[2.6rem] w-full space-y-[2.6rem] ">
				<h1 className="font-[800] text-[1.6rem]">현재 골키퍼에서는 ..</h1>
				<div className="space-y-[3.45rem]">
					<div>
						<h2 className="text-primaryOrange-200 text-[1.6rem] font-[800]">
							총
							<strong className="mx-[1.6rem] bg-primaryOrange-200 text-white px-[1.6rem] py-[0.8rem] rounded-[1.2rem]">
								0개
							</strong>
							의 전체 목표가 등록되었어요!
						</h2>
					</div>
					<div>
						<p className="font-[600] text-[1.6rem] leading-[5.1rem]">
							💰 성공한 목표는 총{' '}
							<strong className=" border-[0.1rem] border-primaryOrange-200 font-[800] text-primaryOrange-200 rounded-[1.2rem] mx-[1.2rem] px-[1.6rem] py-[0.8rem]">
								0개
							</strong>{' '}
							이며,
							<br />
							😰 실패한 목표는 총{' '}
							<strong className=" border-[0.1rem] border-primaryOrange-200 font-[800] text-primaryOrange-200 rounded-[1.2rem] mx-[1.2rem] px-[1.6rem] py-[0.8rem]">
								0개
							</strong>{' '}
							이고,
							<br />
							🎉 진행중인 목표는{' '}
							<strong className=" border-[0.1rem] border-primaryOrange-200 font-[800] text-primaryOrange-200 rounded-[1.2rem] mx-[1.2rem] px-[1.6rem] py-[0.8rem]">
								0개
							</strong>{' '}
							입니다.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}
