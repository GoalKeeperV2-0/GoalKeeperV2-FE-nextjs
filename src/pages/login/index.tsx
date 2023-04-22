import BaseLayout from '@/app.components/App.base/Layout';
import LoginScreen from '@/app.features/Auth/screens/LoginScreen';
import React, { useEffect } from 'react';

function LoginPage() {
	return <LoginScreen onSubmit={() => ''} error="" />;
}

export default LoginPage;
