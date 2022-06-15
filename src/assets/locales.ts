export type Lang = 'zh_CN' | 'en_US'

export type LangValue = {
	[key in Lang]: string
}

export function toLang(value: any): Lang {
	switch (value) {
		case 'zh_CN': return 'zh_CN'
		case 'en_US': return 'en_US'
		default: return 'zh_CN'
	}
}

export type MessageKey = 'Success'
	| 'ConformSpecValue'
	| 'Error'
	| 'NoConformSpecValue'
	| 'NoConformSpecRegExp'
	| 'NoConformDefaultValue'
	| 'Warning'
	| 'Timeout'
	| 'InvalidVerification'
	| 'NoVerification'
	| 'RunningError'
	| 'MsgWarning'
	| 'MsgError'


export type Status = {
	[key in MessageKey]: string
}

export const Status = {
	/** '0': 成功*/
	Success: '0',
	/** '02': 符合指定值*/
	ConformSpecValue: '02',
	/** '1': 错误*/
	error: '1',
	/** '12': 不符合指定值*/
	noConformSpecValue: '12',
	/** '121': 不符合指定正则规则 */
	noConformSpecRegExp: '121',
	/** '13': 不符合默认值*/
	noConformDefaultValue: '13',
	/** '14': 运行错误 */
	RunningError: '14',
	/** '2': 警告*/
	warning: '2',
	/** '21': 无效校验*/
	InvalidVerification: '21',
	/** '22': 没有校验*/
	noVerification: '22',
	/** '23': 超时*/
	Timeout: '23',
}

export type Message = {
	[key in MessageKey]: LangValue
}
export const Message = {
	/** '0': 成功*/
	Success: { zh_CN: '成功', en_US: 'Success' },
	/** '02': 符合指定值*/
	ConformSpecValue: { zh_CN: '符合指定值', en_US: 'Conform to specified value' },
	Error: { zh_CN: '错误', en_US: 'Error' },
	NoConformSpecValue: { zh_CN: '不符合指定值', en_US: 'Does not Conform to specified value' },
	NoConformSpecRegExp: { zh_CN: '不符合指定正则规则', en_US: 'Does not conform to the specified regular rule' },
	NoConformDefaultValue: { zh_CN: '不符合默认值', en_US: 'Does not Conform to default value' },
	Warning: { zh_CN: '警告', en_US: 'Warning' },
	Timeout: { zh_CN: '超时', en_US: 'Time Out' },
	InvalidVerification: { zh_CN: '无效校验', en_US: 'Invalid verification' },
	NoVerification: { zh_CN: '没有校验', en_US: 'No verification' },
	RunningError: { zh_CN: '运行错误', en_US: 'Running error' },

	// 其他提示语
	MsgWarning: { zh_CN: '警告详情', en_US: 'Warning details' },
	MsgError: { zh_CN: '错误详情', en_US: 'Error details' },
}

