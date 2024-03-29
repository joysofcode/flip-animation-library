import { linear } from '$lib/easing'
import type { Options, Rect } from './types'

class Flip {
	selector
	defaults

	constructor(selector: string, defaults: Options = {}) {
		this.selector = selector
		this.defaults = defaults
	}

	rect(el: Element) {
		const rect = el.getBoundingClientRect().toJSON()
		return { el, ...rect }
	}

	measure() {
		return Array.from(document.querySelectorAll(this.selector)).map(this.rect)
	}

	absolute(el: Element, to: Rect) {
		el.setAttribute(
			'style',
			`position: absolute; top: ${to.top}px; left: ${to.left}px; width: ${to.width}px;	height: ${to.height}px;`
		)

		return () => el.removeAttribute('style')
	}

	invert(el: Element, from: Rect, to: Rect, options: Options) {
		// @ts-ignore
		const { promise, resolve } = Promise.withResolvers()

		const dx = from.left - to.left
		const dy = from.top - to.top

		const removeStyle = this.absolute(el, { ...to })
		const flip = el.animate(
			[
				{
					width: `${from.width}px`,
					height: `${from.height}px`,
					transform: `translate(${dx}px, ${dy}px)`,
				},
				{
					width: `${to.width}px`,
					height: `${to.height}px`,
					transform: `translate(0px, 0px)`,
				},
			],
			{ ...options, fill: 'backwards' }
		)

		flip.onfinish = () => {
			removeStyle()
			resolve()
		}

		return promise
	}

	flip(options: Options = {}) {
		const {
			duration = 1000,
			delay = 0,
			stagger = 0,
			easing = linear,
		} = { ...this.defaults, ...options }
		// @ts-ignore
		const { promise, resolve } = Promise.withResolvers()
		const promises: Promise<void>[] = []

		const from = this.measure()

		requestAnimationFrame(() => {
			const to = this.measure()

			for (let i = 0; i < from.length; i++) {
				const promise = this.invert(to[i].el, from[i], to[i], {
					duration,
					delay: i * stagger + delay,
					easing,
				})
				promises.push(promise)
			}

			Promise.all(promises).then(resolve)
		})

		return promise
	}
}

export function createFlip(selector: string, defaults: Options = {}) {
	return new Flip(selector, defaults)
}
