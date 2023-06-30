/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	mode: 'jit',
	important: true,
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				'3xl': '1792px',
				'4xl': '2048px'
			},
			fontSize: {
				'tiny': ['0.625rem', '0.8125rem'],
				'tiny+': ['0.6875rem', '0.875rem'],
				'xs+': ['0.8125rem', '1.125rem'],
				'sm+': ['0.9375rem', '1.375rem']
			},
			colors: (theme) => {
				return {
					'navy': {
						50: '#E7E9EF',
						100: '#C2C9D6',
						150: '#edf5fb',
						200: '#A3ADC2',
						300: '#697A9B',
						400: '#5C6B8A',
						450: '#465675',
						500: '#384766',
						600: '#313E59',
						650: '#1E94CC',
						700: '#26334D',
						750: '#222E45',
						800: '#202B40',
						900: '#192132',
						950: '#409eff'
					},
					'slate-150': '#E9EEF5',
					'primary': colors.sky['500'],
					'primary-focus': colors.sky['600'],
					'info': colors.sky['500'],
					'info-focus': colors.sky['600'],
					'success': colors.emerald['500'],
					'success-focus': colors.emerald['600'],
					'error': '#ff5724',
					'error-focus': '#f03000'
				}
			}
		}
	},
	plugins: []
}
