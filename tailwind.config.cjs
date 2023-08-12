/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', '/swiper/css'],
	theme: {
		extend: {
			colors: {
				primary: '#133ABB',
				darkPrimary: '#0E2C8D',
				textPrimary2: 'rgb(55 65 81)',
				textPrimary: 'rgb(69 69 69)',
				headerPrimary: 'rgb(75,75,75)',
				quotePrimary: 'yellow',
			},
			fontSize: {
				xsm: '.7rem',
			},
			screens: {
				quotelg: '1060px',
				navmd: '830px',
				quotemd: '830px',
				quotesm: '530px',
			},
		},
	},
	plugins: [],
};
