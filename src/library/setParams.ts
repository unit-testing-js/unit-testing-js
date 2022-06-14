import { Expect } from "../assets/type"

export function setParams(...args: any[]): Expect {
	this.params = args
	return this
}