/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{jsx,js,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				eastman_medium: ['Eastman-Medium', 'sans-serif'],
				eastman_regular: ['Eastman-Regular', 'sans-serif'],
				russo: ['"Russo One"', 'sans-serif'],
				fredoka: ['"Fredoka One"', 'cursive'],
				epilogue: ['Epilogue', 'sans-serif'],
			},
			boxShadow: {
				container: '4px 4px 10px 1px rgba(0, 0, 0, 0.25)',
				card: '4px 4px 10px 1px #00000040',
			},
			backgroundImage: {
				'main-restaurant': "url('src/assets/img/restaurant/home-main.png')",
			},
		},
	},
	plugins: [],
}
