import { isArray, isObject } from 'check-it-type'
import type { CaseUnit } from '../type'

export function buildTrueCase(...cases: any[]): CaseUnit[] {
	return cases.map(unit => {
		if (isObject(unit)
			&& Object.keys(unit).includes('tobe')
			&& (Object.keys(unit).includes('param') || Object.keys(unit).includes('params'))
		) {
			return unit
		}
		if (isArray(unit)) {
			return { params: unit, tobe: true }
		}
		return { param: unit, tobe: true }
	})
}

export function buildFalseCase(...cases: any[]): CaseUnit[] {
	return cases.map(unit => {
		if (isObject(unit)
			&& Object.keys(unit).includes('tobe')
			&& (Object.keys(unit).includes('param') || Object.keys(unit).includes('params'))
		) {
			return unit
		}
		if (isArray(unit)) {
			return { params: unit, tobe: false }
		}
		return { param: unit, tobe: false }
	})
}