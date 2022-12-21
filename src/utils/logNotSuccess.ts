import { color } from 'rh-color'
import type { Styles } from 'rh-color'
import type { CaseUnit } from '..'
import { type } from 'abandonjs'
import { parse } from './parse'
import { icon } from './icon'

export function logNotSuccess(list: CaseUnit[] = [], tagColor: Styles, tagFlag) {
	if (list.length === 0) return;
	list.forEach((unit: CaseUnit) => {
		const { name = '', tobe, param, paramsString, paramString } = unit

		const { actual, runTime = -1 } = unit.run
		console.log(
			' ' + color(icon[tagFlag], tagColor) +
			color(` ${name} `, tagColor) +
			// color('actual:' + ' ' + parse(actual, false) + ' ', 'Magenta') +
			// color('tobe:' + ' ' + parse(tobe, false) + ' ', 'Cyan') +
			// color(`${error}`, 'Red') +
			color(` ${runTime}`, 'Grey')
		)
		if (param) {
			console.log(color('  param: ', 'Magenta') + paramString)
		} else {
			console.log(color('  params: ', 'Magenta') + paramsString)
		}

		console.log(color('  tobe: ', 'Yellow') + parse(tobe) + color(` <${type(tobe)}>`, 'Grey'))
		console.log(color('  actual: ', 'Cyan') + parse(actual) + color(` <${type(actual)}>`, 'Grey'))
	})
}