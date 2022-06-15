import { Message, MessageKey, Status } from "../assets/locales"

export function setType(key: MessageKey, message?: string) {
	this.type = Status[key] || '21'
	this.message = message || Message[key]
}