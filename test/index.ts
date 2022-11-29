import './index.test'
import { Cases, falseValue, test, BaseValueMap, BaseValueMapKey, } from '../src'

// test<any, any>('cases', falseValue,
// 	...Cases<Record<string, BaseValueMapKey> | number>(
// 		'@NUMBER',
// 		// 3, '@EMPTY',
// 		{
// 			value: '@DATE',
// 		}
// 	).map((item, index) => {
// 		item.tobe = false
// 		// console.log(item)
// 		if (index === 3) {
// 			// console.log(item)
// 			// item.tobe = true
// 		}
// 		return item
// 	})
// )

// test<any, any>('casesPro', falseValue,
// 	...Cases(
// 		'@NUMBER',
// 		'@NUMBER',
// 		// 3,
// 		// {
// 		// 	'$$type': 'BaseValueMap',
// 		// 	list: [3, 4]
// 		// },
// 		// '@EMPTY',
// 		{
// 			// be: {
// 			// 	value: '@EMPTY',
// 			// 	cv: {
// 			// 		value: '@EMPTY',
// 			// 	}
// 			// },
// 			// value: '@DATE',
// 			// val: ['@DATE'],
// 			// children: {
// 			// 	value: '@EMPTY',
// 			// 	cv: {
// 			// 		value: '@EMPTY',
// 			// 	}
// 			// }
// 			children: {
// 				value: '@NUMBER',
// 				// cv: {
// 				// 	value: '@NUMBER',
// 				// }
// 			}
// 		}
// 	).map((item, index) => {
// 		item.tobe = false
// 		// if (index > 14637)
// 		// if (index > 1325)
// 			// console.log(item.params[1])
// 			// console.log(item.params[1])
// 			// console.log(item.params)
// 		console.log(item.params)
// 		// console.log(item.params[3])
// 		// if (index === 3) {
// 		// 	console.log(item)
// 		// 	item.tobe = true
// 		// }
// 		return item
// 	})
// )
// test<any, any>('casesPlus', falseValue,
// 	...Cases<Record<string, BaseValueMapKey | any> | number>(
// 		'@NUMBER',
// 		// '@NUMBER',
// 		3,
// 		// '@EMPTY',
// 		{
// 			value: '@DATE',
// 			children: {
// 				// value: '@EMPTY'
// 			}
// 		}
// 	).map((item, index) => {
// 		item.tobe = false
// 		// console.log(item.params)
// 		// console.log(item.params[3])
// 		// if (index === 3) {
// 		// 	console.log(item)
// 		// 	item.tobe = true
// 		// }
// 		return item
// 	})
// )

// console.log(BaseValueMap.keys())
// console.log(BaseValueMap.entries())

// console.log(!!{});
// console.log(!![]);
