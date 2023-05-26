'use client';
import Button from '../Button';
import { GoalDataType } from '@/app.features/GoalManage/types';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import React from 'react';
import Link from 'next/link';

interface Props {
	isLoggedIn: boolean;
	todayCertGoal: GoalDataType[];
}
function TodayCert({ isLoggedIn, todayCertGoal }: Props) {
	console.dir(123, todayCertGoal);
	return (
		<>
			{isLoggedIn && (
				<Link href={SERVICE_URL.manageGoal}>
					<span className="absolute top-0 right-0 text-[1.6rem] mb-[0.8rem] font-semibold leading-[1.92rem] text-primaryBlack-200">
						더보기
					</span>
				</Link>
			)}
			<ul className="space-y-[0.7rem]">
				{isLoggedIn &&
					todayCertGoal?.map((goal: GoalDataType) => (
						<Button
							key={goal.id}
							size="sm"
							variant="solid"
							bgColor="bg-primaryOrange-200"
							textColor="text-white"
							onClick={() => null}
						>
							<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
								<span className="truncate">{goal.title}</span>
								<span>🗓 지금</span>
							</div>
						</Button>
					))}

				<Button size="sm" variant="solid" bgColor="bg-buttonGray-200" onClick={() => console.log(todayCertGoal)}>
					<span className="text-center  truncate text-[1.6rem] leading-[1.92rem]">목표등록 하기</span>
				</Button>
			</ul>
		</>
	);
}

export default TodayCert;
