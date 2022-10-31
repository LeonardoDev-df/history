/**
 * @param  {File} file
 * @param  {(value:string|ArrayBuffer,error:ProgressEvent<FileReader>)=>unknown} cb
 */
export function getBase64(
    file: File,
    cb: (value: string | ArrayBuffer, error: ProgressEvent<FileReader>) => unknown
) {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    // Sucesso
    reader.onload = () => cb(reader.result, undefined)

    // Erro
    reader.onerror = error => cb(undefined, error)
}
