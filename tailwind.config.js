/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		fontSize: {
			xs: '0.65rem',
			sm: '0.75rem',
			base: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem'
		},
		extend: {
			keyframes: {
				slideUp: {
					'0%': {
						transform: 'translateY(200px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}

				}
			}
		}
	},
	variants: {
		extend: {
			visibility: ["group-hover"],
		}
	},
	plugins: []
}
