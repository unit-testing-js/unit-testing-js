import { TestTypeMap } from "../type"

export function isSpecifyValue(actualResults: any, args: any[]): boolean {
	this.expectedResults = args
	if (args.includes(actualResults)) {
		this.setType(TestTypeMap.ConformSpecValue)
		return true
	}
	this.setType(TestTypeMap.noConformSpecValue)
	return false
}