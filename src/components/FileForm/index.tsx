import {
    DragEventHandler,
    useCallback,
    useState,
    useRef,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    HTMLAttributes
} from 'react'

import { Container } from './styles'
import { isArrayEmpty } from '../../utils/isItEmpty'

interface FileFormProps extends HTMLAttributes<HTMLInputElement> {
    setFiles: Dispatch<SetStateAction<FileList>>
    hasAdvancedUpload: boolean
    isEmpty: boolean
}

export function FileForm({
    hasAdvancedUpload,
    setFiles,
    isEmpty,
    ...rest
}: FileFormProps) {
    const [isDragOver, setIsDragOver] = useState(false)

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

            setFiles(fileList)
            if (fileList && fileList.length > 1) {
                // multiple files
                filename = `${String(fileList.length)} imagens selecionadas`
            } else {
                // single file or none
                filename = fileList[0].name
            }

            if (filename) {
                const span = label.querySelector('span')
                span.innerHTML = filename
                span.style.display = 'block'
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

            setFiles(input.files)
            if (input.files && input.files.length > 1) {
                // multiple files
                filename = `${input.files.length} imagens selecionadas`
            } else {
                // single file or none
                filename = input.value.split(/[\\]/g).pop()
            }

            if (filename) {
                const span = label.querySelector('span')
                span.innerHTML = filename
                span.style.display = 'block'
            } else {
                label.innerHTML = labelVal
            }
        }
    }, [])

    return (
        <Container
            hasAdvancedOptions={hasAdvancedUpload}
            draggable
            onDragOver={handleDragEnter}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragLeave}
            onDrop={handleDragDrop}
            isDragOver={isDragOver}
            isErrored={isEmpty}
        >
            <input
                ref={inputRef}
                type="file"
                name="file"
                id="file"
                data-multiple-caption="{count} files selected"
                accept="image/jpeg"
                multiple
                onChange={onFileChange}
                {...rest}
            />
            <label htmlFor="file">
                {hasAdvancedUpload && `Solte suas imagens aqui ou `}
                <strong>Escolha uma imagem</strong>
                <span />
            </label>
        </Container>
    )
}
