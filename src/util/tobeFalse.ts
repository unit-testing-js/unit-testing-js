import { isSpecifyValue } from '../check';
import { Expect } from './../expect';
import { TestResult, TestTypeMap } from './../type';
/**
 * 
 * @param args 指定错值
 * @returns 
 */
export function tobeFalse(...args: any[]): Expect {

	const { actualResults }: TestResult = this as TestResult

	if(isSpecifyValue.bind(this)(actualResults, args)){
		return this
	}
	
	if(!actualResults){
		this.setType(TestTypeMap.Success)
		return this
	}

	this.setType(TestTypeMap.noConformDefaultValue)

	return this
}