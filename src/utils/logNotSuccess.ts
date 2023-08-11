import { color } from 'rh-color'
import type { Styles } from 'rh-color'
import type { CaseUnit } from '..'
import { type } from 'abandonjs'
import { isArray, isObject } from 'asura-eye'
import { parse } from './parse'
import { icon } from './icon'

const isLogObject = (value: unknown) => isObject(value) || isArray(value)

const logObject = (value: Record<string, any> | any[]) => {
	const list = JSON.stringify(value, null, 2).split('\n')
	list.forEach((item, index) => {
		if (index + 1 === list.length) {
			console.log('   ' + item + color(`   <${type(value)}>`, 'Grey'))
			return
		}
		console.log('   ' + item)
	})
}

export function logNotSuccess(list: CaseUnit[] = [], tagColor: Styles, tagFlag) {
	if (list.length === 0) return;
	list.forEach((unit: CaseUnit) => {
		const { name = '', tobe, param, paramsString, paramString } = unit

		const { actual, runTime = -1 } = unit.run
		console.log(
			' ' + color(icon[tagFlag], tagColor) +
			color(` ${name} `, tagColor) +
			color(` ${runTime}`, 'Grey')
		)
		if (param) {
			console.log(color('  param: ', 'Magenta') + paramString)
		} else {
			console.log(color('  params: ', 'Magenta') + paramsString)
		}

		if (isLogObject(tobe)) {
			console.log(color('  tobe: ', 'Yellow'))
			logObject(tobe)
		} else {
			console.log(color('  tobe: ', 'Yellow') + parse(tobe) + color(` <${type(tobe)}>`, 'Grey'))
		}

		if (isLogObject(actual)) {
			console.log(color('  actual: ', 'Cyan'))
			logObject(actual)
		} else {
			console.log(color('  actual: ', 'Cyan') + parse(actual) + color(` <${type(actual)}>`, 'Grey'))

		}
	})
}