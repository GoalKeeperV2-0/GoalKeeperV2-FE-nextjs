import React, { useState } from 'react';
import ActiveHighSvg from '@/app.modules/assets/uploadGoal/activeHigh.svg';
import ActiveLowSvg from '@/app.modules/assets/uploadGoal/activeLow.svg';
import InActiveHighSvg from '@/app.modules/assets/uploadGoal/inactiveHigh.svg';
import InActiveLowSvg from '@/app.modules/assets/uploadGoal/inactiveLow.svg';
import { useRecoilState } from 'recoil';
import { goalFormState } from '../store';
import { RewardType } from '@/app.features/GoalManage/types';
import Label from '@/app.components/App.base/Input/Label';

// TODO: 통일성을 주는게 맞나?

function SelectReturnTypeArea() {
	const [goalForm, setGoalForm] = useRecoilState(goalFormState);
	const returnHandler = (reward: RewardType) => {
		setGoalForm({
			...goalForm,
			reward,
		});
	};
	const { reward } = goalForm;
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="return-type" content="달성시 추가금 방식" />
			<div className="flex space-x-[2.3rem]">
				<button type="button" onClick={() => returnHandler('HIGH_RETURN')} name="reward" value="HIGH_RETURN">
					{reward === 'HIGH_RETURN' ? <ActiveHighSvg /> : <InActiveHighSvg />}
				</button>
				<button type="button" onClick={() => returnHandler('LOW_RETURN')} name="reward" value="LOW_RETURN">
					{reward === 'LOW_RETURN' ? <ActiveLowSvg /> : <InActiveLowSvg />}
				</button>
			</div>
		</div>
	);
}

export default SelectReturnTypeArea;
