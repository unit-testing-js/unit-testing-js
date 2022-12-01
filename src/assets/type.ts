export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'Match' | 'Matcher' | 'Type'
export type CaseUnitParamType = 'Normal'

type Callback = (caseUnit: CaseUnit) => CaseUnit | ((caseUnit: CaseUnit) => Promise<CaseUnit>)

export type CaseUnit = {
	/**
	 * 待测试执行方法
	 */
	func?: any
	/**
	 * 测试用例的别名
	 */
	name?: string
	/**
	 * 测试用例参数, 单个
	 */
	param?: any
	/**
	 * 测试用例参数, 多个
	 */
	params?: any[]
	/**
	 * 结果
	 */
	tobe?: any
	/**
	 * 多选一的结果
	 */
	tobes?: any[]
	/**
	 * 警告结果
	 */
	warningTobe?: any
	/**
	 * 警告多个结果
	 */
	warningTobes?: any
	/**
	 * 结果类型
	 */
	type?: CaseUnitType
	/**
	 * 参数类型
	 */
	paramType?: CaseUnitParamType
	/**
	 * 测试执行前
	 */
	before?: Callback
	/**
	 * 判断结果是否正确前
	 */
	beforeEqual?: Callback
	/**
	 * 打印结果前
	 */
	after?: Callback
	/**
	 * @title 超时时间
	 * @default 2000
	 */
	timeout?: number
	run?: {
		actual: any,
		runTime: number,
		error?: string
	}
	[key: string]: any
}