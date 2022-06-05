export type Lang = 'zh_CN' | 'en_US'

export interface MessageMap {
	[key: string]: {
		zh_CN: string,
		en_US: string
	}
}

export function toLang(value: any): Lang {
	switch (value) {
		case 'zh_CN': return 'zh_CN'
		case 'en_US': return 'en_US'
		default: return 'zh_CN'
	}
}

export const messageMap: MessageMap = {
	Success: { zh_CN: '成功', en_US: 'Success' },
	ConformSpecValue: { zh_CN: '符合指定值', en_US: 'Conform to specified value' },
	error: { zh_CN: '错误', en_US: 'Error' },
	noConformSpecValue: { zh_CN: '不符合指定值', en_US: 'Does not Conform to specified value' },
	noConformSpecRegExp: { zh_CN: '不符合指定正则规则', en_US: 'Does not conform to the specified regular rule' },
	noConformDefaultValue: { zh_CN: '不符合默认值', en_US: 'Does not Conform to default value' },
	warning: { zh_CN: '警告', en_US: 'Warning' },
	InvalidVerification: { zh_CN: '无效校验', en_US: 'Invalid verification' },
	noVerification: { zh_CN: '没有校验', en_US: 'No verification' },
	RunningError: { zh_CN: '运行错误', en_US: 'Running error' },

	// 其他提示语
	msgWarning: { zh_CN: '警告详情', en_US: 'Warning details' },
	msgError: { zh_CN: '错误详情', en_US: 'Error details' },
}

