import './index.test'
import { test, TestResultMap } from '../src'

/**
 * @title FileType
 * @description 文件名后缀, 仅识别数字和字母组成的文件拓展名后缀
 * @version 2.2.0
 */
export type FileType = 'Image' | 'Video' | 'PDF' | 'Word' | 'Excel'

/**
 * @title FileTypeMap
 * @description 文件类型映射
 * @version 2.2.0
 */
export const FileTypeMap = new Map<FileType, string[]>([
	['Image', ['png', 'jpeg', 'jpg', 'png', 'bmp']],
	['Video', ['mp4', 'webm', 'ogg']],
	['PDF', ['pdf']],
	['Word', ['doc', 'docx']],
	['Excel', ['xlsx', 'xls', 'csv']],
])

/**
 * @title isFileExtension
 * @description 是否为指定字符串结尾
 * @param fileName string 文件名
 * @param list string[] 文件拓展名数组
 * @returns boolean
 * @version 2.2.0
 */
export function isFileExtension(fileName: string, list: string[] = []): boolean {
	if (typeof fileName !== 'string') return false;
	if (/\.[a-zA-Z0-9]{1,}/.exec(fileName) === null) return false
	if (list.length === 0) return true
	const name = fileName.toLowerCase();
	return list.some(i => name.endsWith('.' + i) === true)
}

/**
 * @title isImageFile
 * @param fileName string
 * @returns boolean
 * @version 2.2.0
 */
export function isImageFile(fileName: string): boolean {
	return isFileExtension(fileName, FileTypeMap.get('Image'))
}

test<any, any>('isFileExtension', isFileExtension,
	{ param: 'png', tobe: false },
	{ param: 'jpeg', tobe: false },
	{ param: 'jpg', tobe: false },
	{ param: 'png', tobe: false },
	{ param: 'bmp', tobe: false },
	{ param: '.png', tobe: true },
	{ param: '.jpeg', tobe: true },
	{ param: '.jpg', tobe: true },
	{ param: '.png', tobe: true },
	{ param: '.bmp', tobe: true },
	{ param: '123.png', tobe: true },
	{ param: '123.png1', tobe: true },
	{ param: '123.jpeg', tobe: true },
	{ param: '123.jpg', tobe: true },
	{ param: '123.png', tobe: true },
	{ param: '123.bmp', tobe: true },
	{ param: 'name.png', tobe: true },
	{ param: 'name.jpeg', tobe: true },
	{ param: 'name.jpg', tobe: true },
	{ param: 'name.png', tobe: true },
	{ param: 'name.bmp', tobe: true },
	{ param: 'bmp', tobe: false },
	{ param: 'png', tobe: false },
	{ param: 'jpeg', tobe: false },
	{ param: 'jpg', tobe: false },
	{ param: 'png', tobe: false },
	{ param: 'bmp', tobe: false },
	{ param: 'bmp123', tobe: false },
	{ param: 'png123', tobe: false },
	{ param: 'jpeg123', tobe: false },
	{ param: 'jpg123', tobe: false },
	{ param: 'png123', tobe: false },
	{ param: 'bmp123', tobe: false },
	{ param: 'png.name', tobe: true },
	{ param: 'jpeg.name', tobe: true },
	{ param: 'jpg.name', tobe: true },
	{ param: 'png.name', tobe: true },
);

// console.log(
test<any, any>('isImageFile', isImageFile,
	{ param: '123.png1', tobe: true },
	{ name: 'isImage-1', param: '123.png', tobe: true },
	{ name: 'isImage-2', param: '123.jpeg', tobe: true },
	{ name: 'isImage-3', param: '123.jpg', tobe: true },
	{ name: 'isImage-4', param: '123.png', tobe: true },
	{ name: 'isImage-5', param: '123.bmp', tobe: true },
	{ name: 'isImage-6', param: 'name.png', tobe: true },
	{ name: 'isImage-7', param: 'name.jpeg', tobe: true },
	{ name: 'isImage-8', param: 'name.jpg', tobe: true },
	{ name: 'isImage-9', param: 'name.png', tobe: true },
	{ name: 'isImage-10', param: 'name.bmp', tobe: true },
	{ name: 'isImage-11', param: 'namepng', tobe: false },
	{ name: 'isImage-12', param: 'namejpeg', tobe: false },
	{ name: 'isImage-13', param: 'namejpg', tobe: false },
	{ name: 'isImage-14', param: 'namepng', tobe: false },
	{ name: 'isImage-15', param: 'bmp', tobe: false },
	{ name: 'isImage-16', param: 'png', tobe: false },
	{ name: 'isImage-17', param: 'jpeg', tobe: false },
	{ name: 'isImage-18', param: 'jpg', tobe: false },
	{ name: 'isImage-19', param: 'png', tobe: false },
	{ name: 'isImage-20', param: 'bmp', tobe: false },
	{ name: 'isImage-21', param: 'bmp123', tobe: false },
	{ name: 'isImage-22', param: 'png123', tobe: false },
	{ name: 'isImage-23', param: 'jpeg123', tobe: false },
	{ name: 'isImage-24', param: 'jpg123', tobe: false },
	{ name: 'isImage-25', param: 'png123', tobe: false },
	{ name: 'isImage-26', param: 'bmp123', tobe: false },
	{ name: 'isImage-27', param: 'png.name', tobe: false },
	{ name: 'isImage-28', param: 'jpeg.name', tobe: false },
	{ name: 'isImage-29', param: 'jpg.name', tobe: false },
	{ name: 'isImage-30', param: 'png.name', tobe: false },
).then((res: any) => {
	// console.log(res?.Map.get('isImageFile').ErrorQue)
})
// )



console.log(TestResultMap.get('isImageFile')?.cases[0])