/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			AppleSDGothicNeo: ['AppleSDGothicNeo', 'Noto Sans KR', 'sans - serif'],
		},
		extend: {
			screens: {
				pc: '510px',
			},
			colors: {
				primaryOrange: {
					100: '#FFEEDB',
					200: '#FF8A00',
					300: '#E47B00',
				},
				primaryRed: {
					100: '#FFEEDB',
					200: '#FF6B6B',
					300: '#FF1523',
				},
				primaryBlack: {
					100: '#E7E7E7',
					200: '#C1C1C1',
					300: '#A6A6A6',
					400: '#8B8B8B',
					500: '#000000',
				},
				primaryWhite: '#FFFFFF',
				buttonBlack: {
					100: '#F4F4F4',
					200: '#FF1523',
				},
				buttonOrange: {
					100: '#FFEEDB',
					200: '#FF1523',
				},
				buttonRed: {
					100: '#FFE8E8',
					200: '#FF6B6B',
				},
				buttonGray: {
					100: '#FAFAFA',
					200: '#F3F3F3',
					300: '#E6E6E6',
					400: '#898989',
				},
				borderGray: '#E7E7E7',
				borderOrange: '#FF8A00',
				statesRed: '#FF1523',
				statesOrange: '#FF8A00',
			},
		},
	},
	/* eslint-disable global-require */
};
