export function sortArrayObject<T>(array: Array<T>, objectKey: string) {
    return array.sort((a, b) => {
        if (a[objectKey] > b[objectKey]) {
            return 1
        }
        if (a[objectKey] < b[objectKey]) {
            return -1
        }
        // a must be equal to b
        return 0
    })
}
