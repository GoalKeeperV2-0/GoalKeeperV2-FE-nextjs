import BaseLayout from '@/app.components/BaseLayout';
import LoginScreen from '@/app.features/Auth/screens/LoginScreen';
import React, { useEffect } from 'react';

function LoginPage() {
	return (
		<BaseLayout>
			<LoginScreen onSubmit={() => ''} error="" />
		</BaseLayout>
	);
}

export default LoginPage;
