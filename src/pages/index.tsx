import { NextPage } from 'next';
import BaseLayout from '@/app.components/BaseLayout';
import HomeScreen from '@/app.features/Home/screens/HomeScreen';
import { useCertList } from '@/app.modules/hooks/useCertList';

const Home: NextPage = () => {
	const { data: certs } = useCertList(0);
	return (
		<>
			<HomeScreen
				certs={certs?.certificationResponses?.content?.slice(0, 6)}
				alreadyVerification={certs?.alreadyVerification}
			/>
		</>
	);
};

export default Home;
/*
<BaseLayout>
			<HomeScreen
				certs={certs?.certificationResponses?.content?.slice(0, 6)}
				alreadyVerification={certs?.alreadyVerification}
			/>
		</BaseLayout>


*/
