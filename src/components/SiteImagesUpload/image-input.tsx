import {
    ChangeEvent,
    DragEventHandler,
    HTMLAttributes,
    useCallback,
    useRef,
    useState
} from 'react'

import { isArrayEmpty } from '../../utils/isItEmpty'
import { getBase64 } from '../../utils/getBase64'
import { InputContainer } from './styles'
import { ChangeFieldProps } from '.'

interface ImageInputProps extends HTMLAttributes<HTMLInputElement> {
    showErrors: boolean
    inputId: string
    index: number
    inputSiteImageInfo: {
        fieldKey: 'image3D' | 'imagePreview'
        imagename: string
        error: boolean
        image: string
        id: string
    }
    setInputGroupData(props: ChangeFieldProps): void
}

export function ImageInput({
    inputSiteImageInfo,
    setInputGroupData,
    showErrors,
    inputId,
    index,
    ...rest
}: ImageInputProps) {
    const [isDragOver, setIsDragOver] = useState(false)

    const { imagename, fieldKey, id, error } = inputSiteImageInfo

    const inputRef = useRef<HTMLInputElement>(null)

    const handlePreventDefault: DragEventHandler<HTMLDivElement> = useCallback(
        e => {
            e.preventDefault()
            e.stopPropagation()
        },
        []
    )

    const handleDragEnter: DragEventHandler<HTMLDivElement> = useCallback(e => {
        handlePreventDefault(e)
        setIsDragOver(true)
    }, [])

    const handleDragLeave: DragEventHandler<HTMLDivElement> = useCallback(e => {
        handlePreventDefault(e)
        setIsDragOver(false)
    }, [])

    const handleDragDrop: DragEventHandler<HTMLDivElement> = useCallback(e => {
        handlePreventDefault(e)
        setIsDragOver(false)
        const fileList = e.dataTransfer.files
        if (inputRef.current && fileList) {
            let filename = ''
            const label = inputRef.current.nextElementSibling
            const labelVal = label.innerHTML

            const onlyImage = Object.keys(fileList)
                .filter(key => fileList[key].type === 'image/jpeg')
                .map(key => fileList[key])

            if (
                isArrayEmpty(onlyImage) ||
                onlyImage.length !== fileList.length ||
                !onlyImage
            ) {
                // vazio ou tem um ou mais arquivos inválidos
                return
            }

            if (fileList && fileList.length > 1) {
                // multiple files
                filename = `${String(fileList.length)} imagens selecionadas`
            } else {
                // single file or none
                filename = fileList[0].name

                // Cortar string
                let shortName: string
                const splitedFilename = filename.split('.')
                const name = splitedFilename[0]
                const fileType = splitedFilename[splitedFilename.length - 1]

                if (name.length >= 10) {
                    shortName = name.substring(0, 10)
                } else {
                    shortName = name
                }

                filename = `${shortName}.${fileType}`
            }

            if (filename) {
                const span = label.querySelector('span')
                span.innerHTML = filename
                span.style.display = 'block'

                getBase64(fileList[0], (val, err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    setInputGroupData({
                        fieldIndex: index,
                        imagename: filename,
                        image: String(val).substring(23),
                        fieldKey,
                        fieldId: id
                    })
                })
            } else {
                label.innerHTML = labelVal
            }
        }
    }, [])

    const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target
        if (inputRef.current && input.files) {
            const label = inputRef.current.nextElementSibling
            const labelVal = label.innerHTML

            let filename = ''

            const onlyImage = Object.keys(input.files)
                .filter(key => input.files[key].type === 'image/jpeg')
                .map(key => input.files[key])

            if (
                isArrayEmpty(onlyImage) ||
                onlyImage.length !== input.files.length ||
                !onlyImage
            ) {
                // vazio ou tem um ou mais arquivos inválidos
                return
            }

            if (input.files && input.files.length > 1) {
                // multiple files
                filename = `${input.files.length} imagens selecionadas`
            } else {
                // single file or none
                filename = input.value.split(/[\\]/g).pop()

                // Cortar string
                let shortName: string
                const splitedFilename = filename.split('.')
                const name = splitedFilename[0]
                const fileType = splitedFilename[1]

                if (name.length >= 10) {
                    shortName = name.substring(0, 10)
                } else {
                    shortName = name
                }

                filename = `${shortName}.${fileType}`
            }

            if (filename) {
                const span = label.querySelector('span')
                span.innerHTML = filename
                span.style.display = 'block'

                getBase64(input.files[0], (val, err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    setInputGroupData({
                        fieldIndex: index,
                        imagename: filename,
                        image: String(val).substring(23),
                        fieldKey,
                        fieldId: id
                    })
                })
            } else {
                label.innerHTML = labelVal
            }
        }
    }, [])

    return (
        <InputContainer
            draggable
            onDragOver={handleDragEnter}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragLeave}
            onDrop={handleDragDrop}
            isDragOver={isDragOver}
            isErrored={error}
            showErrors={showErrors}
        >
            <input
                ref={inputRef}
                type="file"
                name={inputId}
                id={inputId}
                accept="image/jpeg"
                onChange={onFileChange}
                {...rest}
            />

            <label htmlFor={inputId}>
                {!imagename && '+'}
                <span>{imagename}</span>
            </label>
        </InputContainer>
    )
}
