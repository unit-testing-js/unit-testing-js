import { TestTypeMap } from "../assets/type"

export function setType(testTypeKey: TestTypeMap[string], message?: string) {
	this.type = testTypeKey.type
	this.message = message || testTypeKey.message
}