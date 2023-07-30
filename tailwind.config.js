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
						opacity: 0
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: 1
					}
				},
				fadeIn: {
					'0%': {
						opacity: 0
					},
					'100%': {
						opacity: 1
					}
				},
				smallPing: {
					'100%': {
						transform: 'scale(1.15)',
						opacity: 0
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
				dropShadow: {
					'0%': {
						filter: 'drop-shadow(0.4389924193300864px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.4389924193300864px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'5%': {
						filter: 'drop-shadow(1.0928974010788217px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.0928974010788217px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'10%': {
						filter: 'drop-shadow(0.02956275843481219px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.02956275843481219px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'15%': {
						filter: 'drop-shadow(0.40218538552878136px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.40218538552878136px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'20%': {
						filter: 'drop-shadow(1.6794037899852017px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.6794037899852017px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'25%': {
						filter: 'drop-shadow(0.6125630401149584px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.6125630401149584px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'30%': {
						filter: 'drop-shadow(0.7015590085143956px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.7015590085143956px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'35%': {
						filter: 'drop-shadow(1.896914047650351px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.896914047650351px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'40%': {
						filter: 'drop-shadow(1.870905614848819px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.870905614848819px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'45%': {
						filter: 'drop-shadow(1.131056963361899px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.131056963361899px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'50%': {
						filter: 'drop-shadow(0.08084290417898504px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.08084290417898504px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'55%': {
						filter: 'drop-shadow(1.3758461067427543px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.3758461067427543px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'60%': {
						filter: 'drop-shadow(1.202193051050636px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.202193051050636px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'65%': {
						filter: 'drop-shadow(1.8638780614874975px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.8638780614874975px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'70%': {
						filter: 'drop-shadow(0.48874025155497314px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.48874025155497314px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'75%': {
						filter: 'drop-shadow(0.8948491305757957px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.8948491305757957px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'80%': {
						filter: 'drop-shadow(0.0833037308038857px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.0833037308038857px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'85%': {
						filter: 'drop-shadow(0.09769827255241735px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-0.09769827255241735px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'90%': {
						filter: 'drop-shadow(1.743339761481782px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.743339761481782px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'95%': {
						filter: 'drop-shadow(1.2841838852799786px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.2841838852799786px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
					},
					'100%': {
						filter: 'drop-shadow(1.5208764473832513px 0 1px rgba(0, 30, 255, 0.4)) drop-shadow(-1.5208764473832513px 0 1px rgba(255, 0, 80, 0.3)) drop-shadow(0 0 1px)'
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
