import React, { useState } from 'react'

import { InputCloseButton, InputGroupContainer, StClose } from './styles'
import { ImageInput } from './image-input'
import { SiteImageInputType, ChangeFieldProps } from '.'

interface ImageInputGroupProps {
    index: number
    showErrors: boolean
    siteInfo: SiteImageInputType
    removeInputGroup(fieldId: string): void
    setInputGroupData(props: ChangeFieldProps): void
}

export function ImageInputGroup({
    index,
    siteInfo,
    removeInputGroup,
    setInputGroupData,
    showErrors
}: ImageInputGroupProps) {
    const { image3D, imagePreview, id } = siteInfo

    return (
        <InputGroupContainer>
            <div>
                <strong>Imagem 3D</strong>
                <ImageInput
                    inputSiteImageInfo={{
                        id,
                        image: image3D.image,
                        imagename: image3D.name,
                        fieldKey: 'image3D',
                        error: image3D.error
                    }}
                    inputId={`image_${id}`}
                    setInputGroupData={setInputGroupData}
                    index={index}
                    showErrors={showErrors}
                />
            </div>
            <div>
                <strong>Imagem preview</strong>
                <ImageInput
                    inputSiteImageInfo={{
                        id,
                        image: imagePreview.image,
                        imagename: imagePreview.name,
                        fieldKey: 'imagePreview',
                        error: imagePreview.error
                    }}
                    inputId={`image_${id}_2`}
                    setInputGroupData={setInputGroupData}
                    index={index}
                    showErrors={showErrors}
                />
            </div>

            <InputCloseButton onClick={() => removeInputGroup(id)}>
                <StClose />
            </InputCloseButton>
        </InputGroupContainer>
    )
}
