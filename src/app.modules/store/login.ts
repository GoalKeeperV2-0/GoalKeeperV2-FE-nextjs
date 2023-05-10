import React from 'react';
import { atom } from 'recoil';

export const loginState = atom<boolean>({
	key: 'modalState',
	default: false,
});
