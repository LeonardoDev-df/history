export function isObjectEmpty(obj: Object): boolean {
    if (Object.keys(obj).length === 0) {
        return true
    }
    return false
}


export function isArrayEmpty(arr: Array<any>): boolean {
    if (arr.length === 0) {
        return true
    }
    return false
}

export function isValidFileType(fileTypes: string[] | string, file: File) {
    return fileTypes.includes(file.type)
}
