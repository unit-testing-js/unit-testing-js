export * from '../src'

import { loadModule, TestSetting } from '../src'

TestSetting.set('isSummary', true)

loadModule(async () => [
	await import('./unitTest'),
	await import('./demo/01'),
	await import('./demo/02'),
])