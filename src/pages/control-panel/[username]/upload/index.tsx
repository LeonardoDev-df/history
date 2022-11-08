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

import {
    Container,
    Paper,
    FormGroup,
    StButton,
    Copy,
    StForm,
    FormInputContainer
} from '../../../../styles/pages/shared/control-panel.styles'
import {
    SiteImagesUpload,
    SiteImageInputType
} from '../../../../components/SiteImagesUpload'
import { SidebarLayout } from '../../../../components/layouts/sidebar-layout'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../contexts/auth'
import { sortArrayObject } from '../../../../utils/sortArrayObject'
import { asyncHandler } from '../../../../utils/asyncHandler'
import { InputMask } from '../../../../components/InputMask'
import { isArrayEmpty } from '../../../../utils/isItEmpty'
import { Textarea } from '../../../../components/Textarea'
import { useContextSelector } from 'use-context-selector'
import { Loading } from '../../../../components/Loading'
import { Select } from '../../../../components/Select'
import { useToast } from '../../../../hooks/use-toast'
import { Input } from '../../../../components/Input'
import Head from '../../../../infra/components/Head'
import { getAPIClient } from '../../../../services/axios'

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
    siteDescription: string
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
    const [files, setFiles] = useState<SiteImageInputType[]>([])

    // const { colors } = useContext(ThemeContext)
    const account = useContextSelector(AuthContext, c => c.account)
    const { addToast } = useToast()

    const divRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<FormHandles>(null)

    const schema = Yup.object({
        siteName: Yup.string().required('Nome obrigatório'),
        siteDescription: Yup.string().required('Descrição obrigatória'),
        zipCode: Yup.string().required('CEP obrigatório'),
        streetAddress: Yup.string().required('Endereço obrigatório'),
        number: Yup.string(),
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

                const imageInputsErrors = files.map(
                    ({ image3D, imagePreview }) =>
                        image3D.error || imagePreview.error ? true : false
                )

                if (
                    !files ||
                    isArrayEmpty(files) ||
                    imageInputsErrors.includes(true)
                ) {
                    setIsFileError(true)
                    return
                }
                setIsFileError(false)

                await schema.validate(data, {
                    abortEarly: false
                })

                // Success validation
                // const formData = new FormData()
                // const imageData = {
                //     type: image.type,
                //     name: image.name,
                //     size: image.size
                // }

                // formData.append('image', image)
                // formData.append('imageData', JSON.stringify(imageData))
                const handledImages = files.map(
                    ({ image3D, imagePreview }) => ({
                        image3D: image3D.image,
                        imagePreview: imagePreview.image
                    })
                )

                const {
                    city,
                    complement,
                    siteName,
                    streetAddress,
                    province,
                    number,
                    uf,
                    zipCode,
                    siteDescription
                } = data

                const siteData = {
                    description: siteDescription,
                    siteImages: handledImages,
                    idUser: account.id,
                    name: siteName,
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

                // const response = await axios.post(
                //     '/api/historical-sites/create',
                //     {
                //         data: siteData
                //     }
                // )

                const api = getAPIClient()

                const response = await api.post(
                    'https://rv-history-api.herokuapp.com/api/historical-sites',
                    JSON.stringify(siteData),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    }
                )

                if (response && response.data) {
                    addToast({
                        type: 'success',
                        title: 'Boa!!!',
                        description: 'Sítio criado com sucesso!!!'
                    })
                }
                // TODO: Adicionar os toasts
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    // Validation failed
                    const validationErrors = getValidationErrors(err)

                    formRef.current?.setErrors(validationErrors)
                } else {
                    console.log(err)
                    addToast({
                        type: 'error',
                        title: 'Vish',
                        description:
                            'Não conseguimos criar o sítio. Tente novamente.'
                    })
                }
            } finally {
                setIsLoading(false)
            }
        },
        [files]
    )

    const handleCepBlur = useCallback(
        async ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
            const cep = value.replace(/\D/g, '')

            if (cep != '') {
                const validacep = /^[0-9]{8}$/

                if (validacep.test(cep)) {
                    // * Habilitar o loading na tela
                    setIsLoading(true)

                    const [response, error] = await asyncHandler(
                        axios.get<CepResponse>(
                            `https://viacep.com.br/ws/${cep}/json/`
                        )
                    )

                    if (response) {
                        const {
                            data: { logradouro, bairro, localidade, uf }
                        } = response

                        formRef.current.setFieldValue(
                            'streetAddress',
                            logradouro
                        )
                        formRef.current.setFieldValue('province', bairro)
                        formRef.current.setFieldValue('uf', uf)
                        const inUfRef = formRef.current.getFieldRef('uf')
                        inUfRef.select.selectOption({ label: uf, value: uf })

                        const inCityRef = formRef.current.getFieldRef('city')
                        inCityRef.select.selectOption({
                            label: localidade,
                            value: localidade
                        })
                    } else {
                        addToast({
                            type: 'error',
                            title: 'Ocorreu um erro ao buscar seus dados',
                            description:
                                'Não conseguimos buscar suas informações a partir do seu cep'
                        })
                    }
                    setIsLoading(false)
                } else {
                    // cep inválido
                    formRef.current.setFieldError('zipCode', 'cep inválido')
                }
            } else {
                // cep sem valor
                formRef.current.setFieldError('zipCode', 'cep é obrigatório')
            }
        },
        []
    )

    const handleSelectUFChange = useCallback(
        async (value: OptionTypeBase, action: ActionMeta<OptionTypeBase>) => {
            setIsLoading(true)
            try {
                const cityResponse = await axios.get<CityResponse[]>(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value.value}/municipios`
                )
                const handledCityOptions = cityResponse.data.map(item => ({
                    value: item.nome,
                    label: item.nome
                }))
                const sortedOptions = sortArrayObject<
                    typeof handledCityOptions[0]
                >(handledCityOptions, 'value')
                setCitySelectOptions(sortedOptions)
            } catch (error) {
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    return (
        <Container>
            <Head title="Upload 3D | RV History" />

            <Paper ref={divRef}>
                <h2 style={{ marginBottom: '1.6rem' }}>Criar sítio 3D</h2>

                <h3>Informações do sítio</h3>
                <SiteImagesUpload
                    hasAdvancedUpload={hasAdvancedUpload}
                    setFiles={setFiles}
                    showErrors={isFileError}
                />
                <StForm ref={formRef} onSubmit={handleFormSubmit}>
                    <fieldset>
                        <FormInputContainer>
                            <label htmlFor="siteName">Nome do sítio</label>

                            <Input name="siteName" id="siteName" />
                        </FormInputContainer>
                        <FormInputContainer style={{ marginTop: '1.6rem' }}>
                            <label htmlFor="siteDescription">
                                Descrição do sítio
                            </label>

                            <Textarea
                                name="siteDescription"
                                id="siteDescription"
                            />
                        </FormInputContainer>
                    </fieldset>
                    <fieldset>
                        <h3>Endereço</h3>
                        <FormGroup mult={true}>
                            <FormInputContainer>
                                <label htmlFor="zipCode">CEP</label>
                                <InputMask
                                    mask="99999-999"
                                    name="zipCode"
                                    id="zipCode"
                                    onAdditionalBlur={handleCepBlur}
                                />
                            </FormInputContainer>

                            <FormInputContainer gridColumn="2 / 4">
                                <label htmlFor="streetAddress">
                                    Logradouro
                                </label>

                                <Input
                                    name="streetAddress"
                                    id="streetAddress"
                                />
                            </FormInputContainer>
                        </FormGroup>

                        <FormGroup mult={true}>
                            <FormInputContainer gridColumn="1 / 3">
                                <label htmlFor="complement">Complemento</label>
                                <Input name="complement" id="complement" />
                            </FormInputContainer>

                            <FormInputContainer>
                                <label htmlFor="number">
                                    N° da casa ou lote
                                </label>

                                <Input name="number" id="number" />
                            </FormInputContainer>
                        </FormGroup>

                        <FormGroup mult={true}>
                            <div>
                                <label htmlFor="uf">UF</label>

                                <Select
                                    options={UFOptions}
                                    name="uf"
                                    id="uf"
                                    instanceId="uf"
                                    // isSearchable
                                    onChange={handleSelectUFChange}
                                    placeholder="Selecione..."
                                />
                            </div>

                            <div>
                                <label htmlFor="city">Cidade</label>

                                <Select
                                    options={citySelectOptions}
                                    name="city"
                                    id="city"
                                    instanceId="city"
                                    placeholder="Selecione..."
                                />
                            </div>

                            <div>
                                <label htmlFor="province">Bairro</label>
                                <Input name="province" id="province" />
                            </div>
                        </FormGroup>
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
    let UFOptions: readonly (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[]

    const [ufResponse, error] = await asyncHandler(
        axios.get<UFResponse[]>(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        )
    )

    if (ufResponse) {
        const handledUFOptions = ufResponse.data.map(uf => ({
            value: uf.sigla,
            label: uf.sigla
        }))

        UFOptions = sortArrayObject<typeof handledUFOptions[0]>(
            handledUFOptions,
            'value'
        )
    }

    return {
        props: {
            UFOptions
        }
    }
}
