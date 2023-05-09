import { GetServerSideProps, NextPage } from 'next';
import HomeScreen from '@/app.features/Home/screens/HomeScreen';
import { useCertList } from '@/app.modules/hooks/useCertList';
import axios from 'axios';

interface Props {
	serverData?: any;
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	console.log(ctx.req.cookies.GAT);
	const url = 'https://api.goalkeeper.co.kr/api/certifications?page=0';
	const token = ctx.req.cookies.GAT;
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const response = await axios.get(url, { headers });
	const data = response.data;
	return { props: { serverData: data } };
};
const Home: NextPage<Props> = ({ serverData }: Props) => {
	// const { data: certs } = useCertList(0);
	console.dir(serverData?.data?.certificationResponses?.content);
	return (
		<HomeScreen
			certs={serverData?.data?.certificationResponses?.content?.slice(0, 6)}
			alreadyVerification={serverData?.data?.alreadyVerification}
		/>
	);
};
export default Home;
