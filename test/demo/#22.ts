import {arrayToTree} from 'abandonjs'
import { test } from '..'

test('arrayToTree', arrayToTree,
	{
		params: [
			[
				{ id: '1', },
				{ id: '3', },
				{ id: '4', pid: '2', },
				{ id: '2', pid: '1', },
			]
		],
		tobe: [
			{
				"id": "1", "children": [{
					"id": "2", "pid": "1",
					"children": [
						{ "id": "4", "pid": "2" }
					]
				}]
			},
			{ "id": "31" }
		]
	}
)