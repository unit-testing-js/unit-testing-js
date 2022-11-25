export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'Match' | 'Matcher' | 'Type'
export type CaseUnitParamType = 'Normal'

export type _Tobe<T> = number | string | RegExp | T

type _callback<Param, Tobe> = (caseUnit: CaseUnit<Param, Tobe>) => CaseUnit<Param, Tobe>

type _asyncCallback<Param, Tobe> = (caseUnit: CaseUnit<Param, Tobe>) => Promise<CaseUnit<Param, Tobe>>

type callback<Param, Tobe> = _callback<Param, Tobe> | _asyncCallback<Param, Tobe>

export type CaseUnit<Param, Tobe> = {
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
	param?: Param
	/**
	 * 测试用例参数, 多个
	 */
	params?: Param | Param[]
	/**
	 * 结果
	 */
	tobe?: _Tobe<Tobe>
	/**
	 * 多选一的结果
	 */
	tobes?: _Tobe<Tobe>[]
	/**
	 * 警告结果
	 */
	warningTobe?: _Tobe<Tobe>
	/**
	 * 警告多个结果
	 */
	warningTobes?: _Tobe<Tobe>[]
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
	before?: callback<Param, Tobe>
	/**
	 * 判断结果是否正确前
	 */
	beforeEqual?: callback<Param, Tobe>
	/**
	 * 打印结果前
	 */
	after?: callback<Param, Tobe>
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