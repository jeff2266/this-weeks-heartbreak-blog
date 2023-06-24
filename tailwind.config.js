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
						transform: 'translateY(100px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}

				},
				flicker: {
					'0%': {
						opacity: 0.97861
					},
					'5%': {
						opacity: 0.94769
					},
					'10%': {
						opacity: 0.93604
					},
					'15%': {
						opacity: 0.90626
					},
					'20%': {
						opacity: 0.88128
					},
					'25%': {
						opacity: 0.93891
					},
					'30%': {
						opacity: 0.95583
					},
					'35%': {
						opacity: 0.97807
					},
					'40%': {
						opacity: 0.88559
					},
					'45%': {
						opacity: 0.94693
					},
					'50%': {
						opacity: 0.96019
					},
					'55%': {
						opacity: 0.88594
					},
					'60%': {
						opacity: 0.90313
					},
					'65%': {
						opacity: 0.91988
					},
					'70%': {
						opacity: 0.93455
					},
					'75%': {
						opacity: 0.87288
					},
					'80%': {
						opacity: 0.91428
					},
					'85%': {
						opacity: 0.90419
					},
					'90%': {
						opacity: 0.9003
					},
					'95%': {
						opacity: 0.87108
					},
					'100%': {
						opacity: 0.94387
					}
				},
				textShadow: {
					'0%': {
						textShadow: '0.4389924193300864px 0 1px rgba(0, 30, 255, 0.5), -0.4389924193300864px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'5%': {
						textShadow: '1.7928974010788217px 0 1px rgba(0, 30, 255, 0.5), -1.7928974010788217px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'10%': {
						textShadow: '0.02956275843481219px 0 1px rgba(0, 30, 255, 0.5), - 0.02956275843481219px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'15%': {
						textShadow: '0.40218538552878136px 0 1px rgba(0, 30, 255, 0.5), - 0.40218538552878136px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'20%': {
						textShadow: '2.4794037899852017px 0 1px rgba(0, 30, 255, 0.5), - 2.4794037899852017px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'25%': {
						textShadow: '0.6125630401149584px 0 1px rgba(0, 30, 255, 0.5), -0.6125630401149584px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'30%': {
						textShadow: '0.7015590085143956px 0 1px rgba(0, 30, 255, 0.5), -0.7015590085143956px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'35%': {
						textShadow: '2.896914047650351px 0 1px rgba(0, 30, 255, 0.5), -2.896914047650351px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'40%': {
						textShadow: '2.870905614848819px 0 1px rgba(0, 30, 255, 0.5), -2.870905614848819px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'45%': {
						textShadow: '1.231056963361899px 0 1px rgba(0, 30, 255, 0.5), -1.231056963361899px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'50%': {
						textShadow: '0.08084290417898504px 0 1px rgba(0, 30, 255, 0.5), -0.08084290417898504px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'55%': {
						textShadow: '1.3758461067427543px 0 1px rgba(0, 30, 255, 0.5), -1.3758461067427543px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'60%': {
						textShadow: '1.202193051050636px 0 1px rgba(0, 30, 255, 0.5), -1.202193051050636px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'65%': {
						textShadow: '1.8638780614874975px 0 1px rgba(0, 30, 255, 0.5), -1.8638780614874975px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'70%': {
						textShadow: '0.48874025155497314px 0 1px rgba(0, 30, 255, 0.5), -0.48874025155497314px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'75%': {
						textShadow: '0.8948491305757957px 0 1px rgba(0, 30, 255, 0.5), -0.8948491305757957px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'80%': {
						textShadow: '0.0833037308038857px 0 1px rgba(0, 30, 255, 0.5), -0.0833037308038857px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'85%': {
						textShadow: '0.09769827255241735px 0 1px rgba(0, 30, 255, 0.5), -0.09769827255241735px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'90%': {
						textShadow: '2.443339761481782px 0 1px rgba(0, 30, 255, 0.5), -2.443339761481782px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'95%': {
						textShadow: '2.1841838852799786px 0 1px rgba(0, 30, 255, 0.5), -2.1841838852799786px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
					},
					'100%': {
						textShadow: '2.6208764473832513px 0 1px rgba(0, 30, 255, 0.5), -2.6208764473832513px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px'
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
}
