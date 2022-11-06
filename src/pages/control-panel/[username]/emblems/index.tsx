import {
    useContext,
    useRef,
    useEffect,
    useState,
    useCallback,
    FocusEvent
} from 'react'
import { ActionMeta, GroupTypeBase, OptionTypeBase } from 'react-select'
import { FormHandles, SubmitHandler } from '@unform/core'
import { ThemeContext } from 'styled-components'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import * as Yup from 'yup'
import axios from 'axios'


import { Flex } from './Flex';

import { Box } from './Box';



import {
    Container,
    Paper,
    EmblemGold,
    EmblemSilver,
    EmblemBronzi,
    FormGroup,
    StTrashEmble,
    StAdd,
    StButton,
    Copy,
    PseudoInput,
    StForm,
    FormInputContainer
} from '../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../components/layouts/sidebar-layout'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { sortArrayObject } from '../../../../utils/sortArrayObject'
import { asyncHandler } from '../../../../utils/asyncHandler'
import { InputMask } from '../../../../components/InputMask'
import { FileForm } from '../../../../components/FileForm'
import { AUTH_TOKEN_KEY } from '../../../../contexts/auth'
import { Loading } from '../../../../components/Loading'
import { Select } from '../../../../components/Select'
import { useToast } from '../../../../hooks/use-toast'
import { Input } from '../../../../components/Input'
import Head from '../../../../infra/components/Head'


interface CepResponse {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    unidade: string
    ibge: string
    gia: string
}

interface UFResponse {
    sigla: string
    nome: string
}
interface CityResponse {
    nome: string
}

type OptionProps = readonly (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[]

type FormSiteData = {
    siteName: string
    zipCode: string
    streetAddress: string
    number: string
    complement: string
    province: string
    city: string
    uf: string
}

function Upload({ UFOptions }) {
    const [citySelectOptions, setCitySelectOptions] = useState<OptionProps>()
    const [hasAdvancedUpload, setHasAdvancedUpload] = useState(false)
    const [isFileError, setIsFileError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState<FileList>()

    const { colors } = useContext(ThemeContext)
    const { addToast } = useToast()

    const divRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<FormHandles>(null)

    const schema = Yup.object({
        siteName: Yup.string().required('Nome obrigatório'),
        zipCode: Yup.string().required('CEP obrigatório'),
        streetAddress: Yup.string().required('Endereço obrigatório'),
        number: Yup.string().required('Número obrigatório'),
        complement: Yup.string(),
        province: Yup.string().required('Bairro obrigatório'),
        city: Yup.string().required('Cidade obrigatório'),
        uf: Yup.string().required('UF obrigatório')
    })

    const isAdvancedUpload = () => {
        const div = divRef.current
        if (div) {
            return (
                ('draggable' in div ||
                    ('ondragstart' in div && 'ondrop' in div)) &&
                'FormData' in window &&
                'FileReader' in window
            )
        } else {
            return false
        }
    }

    // execute the script above in a useEffect to garantee that is in client-side
    useEffect(() => {
        if (isAdvancedUpload()) {
            setHasAdvancedUpload(true)
        }
    }, [])

    const handleFormSubmit: SubmitHandler<FormSiteData> = useCallback(
        async (data, { reset }) => {
            setIsLoading(true)
            try {
                reset()

                if (!files) {
                    setIsFileError(true)
                    throw new Error('No file encountered')
                }
                setIsFileError(false)

                await schema.validate(data, {
                    abortEarly: false
                })

                const image = files[0]
                // Success validation
                // const formData = new FormData()
                // const imageData = {
                //     type: image.type,
                //     name: image.name,
                //     size: image.size
                // }

                // formData.append('image', image)
                // formData.append('imageData', JSON.stringify(imageData))
                const {
                    city,
                    complement,
                    siteName,
                    streetAddress,
                    province,
                    number,
                    uf,
                    zipCode
                } = data

                const siteData = {
                    imageContentType: image.type,
                    name: siteName,
                    size: image.size,
                    image,
                    address: {
                        city,
                        complement,
                        streetAddress,
                        province,
                        number,
                        uf,
                        zipCode
                    }
                }
                // TODO: API connection
                const response = await axios.post(
                    '/api/historical-sites/create',
                    siteData
                )
                if (response && response.data) {
                    console.log(response.data)
                }
                // TODO: Adicionar os toasts
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    // Validation failed
                    const validationErrors = getValidationErrors(err)

                    formRef.current?.setErrors(validationErrors)
                }
            } finally {
                setIsLoading(false)
            }
        },
        [files]
    )

    


    return (
        <Container>

            <Paper ref={divRef}>
            <h2 className='emblem'>Emblemas Cadastrados</h2>
            <Flex
            padding={3}
            bgColor=""
            height="230px"
            container
            justifyContent="space-around"
            alignItems="flex-start"
            >
                <EmblemBronzi />

                <EmblemSilver />

                <EmblemGold/>
            </Flex>



            <div className='pontos'>
                <StTrashEmble  />

                <StTrashEmble  />

                <StTrashEmble  />
            </div>
        

            <div className='pontos'>

                     <div>
                    <h3>5 Pontos</h3>
                    </div>
                    <div>
                    <h3>7 Pontos </h3>
                    </div>

                    <div>
                    <h3>10 Pontos </h3>
                    </div>
            </div>




            <h3 className='msg'>Ao participar do quiz o usuário recebe o emblema e acumula pontos para classificação no ranking.</h3>


                <Loading isVisible={isLoading} />
            </Paper>


            <Paper ref={divRef}>
                <h2 style={{ marginBottom: '1.6rem' }}>Criar Emblemas</h2>

                <StForm ref={formRef} onSubmit={handleFormSubmit}>
                    <fieldset>
                        <h3>Informações sobre o emblema</h3>
                        <FileForm
                            hasAdvancedUpload={hasAdvancedUpload}
                            setFiles={setFiles}
                            isEmpty={isFileError}
                        />

                        <div>
                            <label htmlFor="siteName">Nome do Emblema</label>

                            <Input name="siteName" id="siteName" />
                        </div>
                    </fieldset>
                    <StButton type="submit" toRight>
                        Enviar
                    </StButton>
                </StForm>
                <Loading isVisible={isLoading} />
            </Paper>

            <Copy>&copy; 2021 RVHistory. All right reserved.</Copy>
        </Container>
    )
}

Upload.Layout = SidebarLayout

export default Upload

export const getServerSideProps: GetServerSideProps = async ctx => {
    // * isAutheticated method
    const { [AUTH_TOKEN_KEY]: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }




    return {
        props: {

        }
    }
}
