import {
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
    useEffect
} from 'react'
import { v4 as uuid } from 'uuid'

import { ImageInputGroup } from './image-input-group'
import { Container, PlusButton } from './styles'

interface SiteImagesProps {
    setFiles: Dispatch<SetStateAction<SiteImageInputType[]>>
    hasAdvancedUpload: boolean
    showErrors: boolean
}

export type SiteImageInputType = {
    id: string
    image3D: {
        image: string
        name: string
        error: boolean
    }
    imagePreview: {
        image: string
        name: string
        error: boolean
    }
}

export type ChangeFieldProps = {
    fieldId: string
    fieldIndex: number
    fieldKey: 'image3D' | 'imagePreview'
    imagename: string
    image: string
}

export function SiteImagesUpload({
    hasAdvancedUpload,
    setFiles,
    showErrors
}: SiteImagesProps) {
    const [objImages, setObjImages] = useState<SiteImageInputType[]>([])

    const handleAddInputField = useCallback(() => {
        setObjImages(prev => [
            ...prev,
            {
                id: uuid(),
                image3D: {
                    image: '',
                    name: '',
                    error: true
                },
                imagePreview: {
                    image: '',
                    name: '',
                    error: true
                }
            }
        ])
    }, [])

    const handleRemoveInputField = useCallback((fieldId: string) => {
        setObjImages(prev => prev.filter(item => item.id !== fieldId))
    }, [])

    const handleSetInputFieldImage = useCallback(
        ({ image, imagename, fieldId, fieldKey }: ChangeFieldProps) => {
            setObjImages(prev => {
                const fieldData = prev.find(item => item.id === fieldId)

                // Changing the object value directly to maintain
                // his position on the item's list
                // bad way because is changing the "prev" state(array) too
                fieldData[fieldKey].name = imagename
                fieldData[fieldKey].image = image
                fieldData[fieldKey].error = !image ? true : false

                return Object.assign([], prev, fieldData)
            })
        },
        []
    )

    useEffect(() => {
        setObjImages([
            {
                id: uuid(),
                image3D: {
                    image: '',
                    name: '',
                    error: true
                },
                imagePreview: {
                    image: '',
                    name: '',
                    error: true
                }
            }
        ])
    }, [])

    useEffect(() => {
        setFiles(objImages)
    }, [objImages])

    return (
        <Container hasAdvancedOptions={hasAdvancedUpload}>
            <div>
                {objImages.map((item, index) => (
                    <ImageInputGroup
                        key={item.id.toString()}
                        index={index}
                        siteInfo={item}
                        removeInputGroup={handleRemoveInputField}
                        setInputGroupData={handleSetInputFieldImage}
                        showErrors={showErrors}
                    />
                ))}

                <PlusButton onClick={handleAddInputField}>
                    <strong>Adicionar sala +</strong>
                </PlusButton>
            </div>
        </Container>
    )
}
