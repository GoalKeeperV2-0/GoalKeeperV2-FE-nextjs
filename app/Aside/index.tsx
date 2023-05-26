//'use client';
import React from 'react';
import OverviewTemplate from './OverviewTemplate';
import { GoalDataType, MappedCategory } from '@/app.features/GoalManage/types';

import { cookies } from 'next/headers';
import TodayCert from './TodayCert';
async function getUserStatisticsData() {
	const url = 'https://api.goalkeeper.co.kr/api/statistics/user';
	const token = cookies().get('GAT')?.value;
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const res = await fetch(url, { headers });
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}
async function getUserProfileData() {
	const url = 'https://api.goalkeeper.co.kr/api/credential';
	const token = cookies().get('GAT')?.value;
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const res = await fetch(url, { headers });
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

async function getUserPointsData() {
	const url = 'https://api.goalkeeper.co.kr/api/statistics/user/points';
	const token = cookies().get('GAT')?.value;
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const res = await fetch(url, { headers });
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}
async function getTodayCertGoalData() {
	const url = 'https://api.goalkeeper.co.kr/api/statistics/user/goals';
	const token = cookies().get('GAT')?.value;
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const res = await fetch(url, { headers });
	//console.dir(res);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

// TODO: field & value mapping 시키기
export default async function Aside() {
	//const [modal, setModal] = useRecoilState(modalState);
	//const [isLoggedIn, setIsloggedIn] = useRecoilState(loginState);
	const { data: userStatisticsData } = await getUserStatisticsData();
	const { data: user } = await getUserProfileData();
	const { data: todayCertGoal } = await getTodayCertGoalData();
	const { data: userPoints } = await getUserPointsData();
	const UserStatisticsMap = {
		totalGoalCount: '등록한 목표',
		totalOngoingGoalCount: '진행중인 목표',
		totalSuccessGoalCount: '성공한 목표',
		totalFailGoalCount: '실패한 목표',
	};
	//console.dir(userPoints);
	/*const closeModalHandler = () => {
		setModal({
			render: null,
			isOpen: false,
		});
	};*/
	const PointData = [
		{
			field: '사용 가능',
			value: userPoints?.usablePoint,
		},
		...Object.entries(MappedCategory).map(([key, field]) => ({
			field,
			value: userPoints?.categoryPoints?.[key],
		})),
	];
	/*
	const openModalHandler = (goalData: GoalDataType) => {
		setModal({ render: <DetailGoal goal={goalData} onCloseModal={closeModalHandler} />, isOpen: true });
	};
*/
	const isLoggedIn = true;
	return (
		<aside className="hidden pc:block h-fit w-[27.8rem]   rounded-[1.6rem] p-[2.4rem] border-[0.1rem] border-borderGray  bg-white space-y-[2rem]">
			<div className="space-y-[3rem]">
				<div className="space-y-[0.4rem]">
					<div className="pc:text-body6-pc ">{isLoggedIn ? user?.name : '로그인을 해주세요'}</div>
					<div className="pc:text-body2-pc text-primaryOrange-200 ">{isLoggedIn ? user?.email : '바로가기'}</div>
				</div>
				<OverviewTemplate title="">
					<ul className="p-[1.6rem]   rounded-[0.8rem] bg-buttonGray-100 pc:text-body1-pc space-y-[1.6rem]">
						{Object.entries(UserStatisticsMap)?.map(([key, value], index) => (
							<li className="flex justify-between items-center" key={index}>
								<div className="flex items-center">{value}</div>
								<div className="text-primaryOrange-200">{isLoggedIn ? userStatisticsData?.[key] : 0}</div>
							</li>
						))}
					</ul>
				</OverviewTemplate>
				<OverviewTemplate title="오늘 인증해주세요">
					<TodayCert isLoggedIn={isLoggedIn} todayCertGoal={todayCertGoal} />
				</OverviewTemplate>
				<OverviewTemplate title="포인트">
					<ul className="p-[1.6rem] rounded-[0.8rem] bg-buttonGray-100 text-body1-pc space-y-[1.6rem]">
						{PointData.map((item: any, index: number) => (
							<li key={index} className="flex justify-between items-center first:text-primaryOrange-200">
								<div>{item?.field}</div>
								<div className="flex items-center space-x-[0.6rem]">
									<span>{isLoggedIn ? item.value?.toLocaleString() : 0}</span>
									<img alt="" src="/images/aside/ball.svg" className="mt-[0.3rem]" />
								</div>
							</li>
						))}
					</ul>
				</OverviewTemplate>
			</div>
		</aside>
	);
}
