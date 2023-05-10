import CertificationsScreen from '@/app.features/Certification/screens/CertificationsScreen';
import { CategoryType } from '@/app.features/GoalManage/types';
import { getCertByCategory } from '@/app.modules/api/certification';
import { useCertList } from '@/app.modules/hooks/useCertList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';

interface Props {
	serverData?: any;
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	console.log(ctx.req.cookies.GAT);
	const url = 'https://api.goalkeeper.co.kr/api/certifications?page=0';
	const token = ctx.req.cookies.GAT;
	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: true,
			},
		};
	}
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const response = await axios.get(url, { headers });
	const data = response.data;
	return { props: { serverData: data } };
};
function CertListPage({ serverData }: Props) {
	const [curPage, setCurPage] = useState<number>(0);
	const [category, setCategory] = useState<CategoryType | null>(null);
	const { data: certs } = useCertList(curPage, !category);
	const { data: filteredCerts } = useQuery(
		['certs', category],
		() => getCertByCategory(curPage, category as CategoryType),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (error) => {
				console.log(error);
			},
			enabled: !!category,
		}
	);
	const certFilterHandler = (filter: CategoryType | null) => {
		setCategory(filter);
	};
	useEffect(() => {
		setCurPage(0); //필터 바뀌면 페이지 num 0으로 초기화
	}, [category]);
	return (
		<CertificationsScreen
			certs={
				category === null
					? serverData?.data?.certificationResponses?.content
					: filteredCerts?.certificationResponses?.content
			}
			alreadyVerification={
				category === null ? serverData?.data?.alreadyVerification : filteredCerts?.alreadyVerification
			}
			onCertFilterChange={certFilterHandler}
			certFilter={category}
			curPage={curPage}
			onPageChange={(page: number) => setCurPage(page)}
			totalPages={
				category === null
					? serverData?.data?.certificationResponses?.totalPages
					: filteredCerts?.certificationResponses?.totalPages
			}
		/>
	);
}

export default CertListPage;
