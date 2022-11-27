import './index.test'
import { Cases, falseValue, test, BaseValueMap, BaseValueMapKey, CasesPlus } from '../src'

test<any, any>('cases', falseValue,
	...Cases<Record<string, BaseValueMapKey> | number>(
		'@NUMBER', 
		// 3, '@EMPTY',
		{
			value: '@DATE',
		}
	).map((item, index) => {
		item.tobe = false
		// console.log(item)
		if (index === 3) {
			// console.log(item)
			// item.tobe = true
		}
		return item
	})
)

test<any, any>('casesPlus', falseValue,
	...CasesPlus<Record<string, BaseValueMapKey> | number>(
		'@NUMBER', 
		// 3, '@EMPTY',
		{
			value: '@DATE',
		}
	).map((item, index) => {
		item.tobe = false
		// console.log(item)
		// if (index === 3) {
		// 	console.log(item)
		// 	item.tobe = true
		// }
		return item
	})
)

// console.log(BaseValueMap.keys())
// console.log(BaseValueMap.entries())

// console.log(!!{});
// console.log(!![]);
