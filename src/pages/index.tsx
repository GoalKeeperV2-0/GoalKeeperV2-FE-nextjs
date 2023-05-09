import { GetServerSideProps, NextPage } from 'next';
import HomeScreen from '@/app.features/Home/screens/HomeScreen';
import { useCertList } from '@/app.modules/hooks/useCertList';
import axios from 'axios';

interface Props {
	data: any;
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	console.log(ctx.req.headers.cookie);
	/*const url = 'https://api.goalkeeper.co.kr/api/certifications?page=0';
	const response = await axios.get(url);
	const data = response.data;*/
	return {
		props: { data: 12 }, // will be passed to the page component as props
	};
};
const Home: NextPage<Props> = ({ data: certs }) => {
	// const { data: certs } = useCertList(0);
	console.dir(certs);
	return <div />;

export default Home;
/*

<HomeScreen
				certs={certs?.certificationResponses?.content?.slice(0, 6)}
				alreadyVerification={certs?.alreadyVerification}
			/>
*/