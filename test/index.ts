import './index.test'
import { Cases, falseValue, test } from '../src'

test<any, any>('cases', falseValue,
	...Cases('@NUMBER', 3, '@EMPTY').map((item, index) => {
		item.tobe = false
		if (index === 3) {
			console.log(item)
			item.tobe = true
		}
		return item
	})
)
