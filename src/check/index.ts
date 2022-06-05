import { TestTypeMap } from "../assets/type"

export function isSpecifyValue(actualResults: any, args: any[]): boolean {
	this.expect = args
	if (args.includes(actualResults)) {
		this.setType(TestTypeMap.ConformSpecValue)
		return true
	}
	this.setType(TestTypeMap.noConformSpecValue)
	return false
}