import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import OverviewTemplate from './OverviewTemplate';
import { getUserProfile } from '@/app.modules/api/user';
import { modalState } from '@/app.modules/store/modal';
import { getTodayCertGoal, getUserPoints, getUserStatistics } from '@/app.modules/api/overview';
import { GoalDataType, MappedCategory } from '@/app.features/GoalManage/types';
import Link from 'next/link';
import { SERVICE_URL } from '@/app.modules/constants/ServiceUrl';
import { useQuery } from '@tanstack/react-query';
import DetailGoal from '@/app.features/GoalManage/modalContents/DetailGoal';
import UploadGoal from '@/app.features/GoalUpload/modalContents/UploadGoal';
import Button from '../Button';
import { getCookie } from '@/app.modules/cookie';
import { loginState } from '@/app.modules/store/login';
import client from '@/app.modules/api/client';

// TODO: field & value mapping 시키기
function Aside() {
	const [modal, setModal] = useRecoilState(modalState);
	const [isLoggedIn, setIsloggedIn] = useRecoilState(loginState);
	const { data: userStatisticsData } = useQuery(['user', 'statistics'], getUserStatistics, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { data: user, refetch } = useQuery(['user'], getUserProfile, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const { data: userPoints } = useQuery(['user', 'statistics', 'point'], getUserPoints, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const { data: todayCertGoal } = useQuery(['user', 'statistics', 'todayCert'], getTodayCertGoal, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const UserStatisticsMap = {
		totalGoalCount: '등록한 목표',
		totalOngoingGoalCount: '진행중인 목표',
		totalSuccessGoalCount: '성공한 목표',
		totalFailGoalCount: '실패한 목표',
	};
	const closeModalHandler = () => {
		setModal({
			render: null,
			isOpen: false,
		});
	};
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
	const openModalHandler = (goalData: GoalDataType) => {
		setModal({ render: <DetailGoal goal={goalData} onCloseModal={closeModalHandler} />, isOpen: true });
	};
	useEffect(() => {
		if (!isLoggedIn) {
			console.log(isLoggedIn, '로그아웃됨');
			client.defaults.headers['Authorization'] = '';
			refetch();
		}
	}, [isLoggedIn]);
	return (
		<aside className="hidden pc:block h-fit w-[27.8rem]   rounded-[1.6rem] p-[2.4rem] border-[0.1rem] border-borderGray  bg-white space-y-[2rem]">
			<div className="space-y-[0.4rem]">
				<div className="pc:text-body6-pc ">{isLoggedIn ? user?.name : '로그인을 해주세요'}</div>
				<div className="pc:text-body2-pc text-primaryOrange-200 ">{isLoggedIn ? user?.email : '바로가기'}</div>
			</div>
			<div className="space-y-[3rem]">
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
									onClick={() => openModalHandler(goal)}
								>
									<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
										<span className="truncate">{goal.title}</span>
										<span>🗓 지금</span>
									</div>
								</Button>
							))}

						<Button
							size="sm"
							variant="solid"
							bgColor="bg-buttonGray-200"
							onClick={() => setModal({ render: <UploadGoal />, isOpen: true })}
						>
							<span className="text-center  truncate text-[1.6rem] leading-[1.92rem]">목표등록 하기</span>
						</Button>
					</ul>
				</OverviewTemplate>
				<OverviewTemplate title="포인트">
					<ul className="p-[1.6rem] rounded-[0.8rem] bg-buttonGray-100 text-body1-pc space-y-[1.6rem]">
						{PointData.map((item, index) => (
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

export default Aside;
