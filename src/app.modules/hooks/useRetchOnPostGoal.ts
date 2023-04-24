import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useMyGoals } from './useMyGoals';

export const useRetchOnPostGoal = () => {
	const { refetch } = useMyGoals(0);
	const refetchOnPostGoal = () => {
		refetch();
	};
	return { refetchOnPostGoal };
};
