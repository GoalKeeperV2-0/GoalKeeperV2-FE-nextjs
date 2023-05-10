import { GetServerSideProps, NextPage } from 'next';
import HomeScreen from '@/app.features/Home/screens/HomeScreen';
import { useCertList } from '@/app.modules/hooks/useCertList';
import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from '@/app.modules/cookie';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginState } from '@/app.modules/store/login';
import Layout from '@/app.components/App.base/Layout';
import Aside from '@/app.components/App.base/Aside';

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
	try {
		const response = await axios.get(url, { headers });
		const data = response.data;
		return { props: { serverData: data } };
	} catch {
		return { props: {} };
	}
};
const Home: NextPage<Props> = ({ serverData }: Props) => {
	// const { data: certs } = useCertList(0);
	console.dir(serverData?.data?.certificationResponses?.content);
	const router = useRouter();
	const [isloggedIn, setIsloggedIn] = useRecoilState(loginState);

	return (
		<>
			{serverData && (
				<HomeScreen
					certs={serverData?.data?.certificationResponses?.content?.slice(0, 6)}
					alreadyVerification={serverData?.data?.alreadyVerification}
				/>
			)}
		</>
	);
};
export default Home;
