import { Func } from './Func'
import barba from '@barba/core'
import { gsap } from 'gsap'
import '../scss/app.scss'

console.log(Func('Hello'))

barba.init({
	transitions: [
		{
			name: 'default-transition',
			leave() {
				gsap.to('.page-transition', { opacity: 0, duration: 1 })
			},
			enter() {
				gsap.from('.page-transition', { opacity: 0, duration: 1 })
			},
		},
	],
})
