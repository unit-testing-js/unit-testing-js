export * from '../src'

import { loadModule, TestSetting } from '../src'

TestSetting.set('isSummary', true)

loadModule(async () => {
	import('./testParam')
	import('./demo/unitTest')
	import('./demo/01')
	import('./demo/02')
	import('./demo/03')
	import('./demo/#22')
	import('./demo/md')
	import('./demo/runByName')
})