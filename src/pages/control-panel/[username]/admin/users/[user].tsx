import { useState, useCallback, useRef } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import axios, { AxiosResponse } from 'axios'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import {
    Container,
    CardGrid,
    Copy,
    ModalGridRow,
    StatusFlag,
    ModalContainer,
    ModalSubItem,
    StDownLoad,
    StShare,
    ModalCloseButton,
    StClose,
    StButton
} from '../../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../../components/layouts/sidebar-layout'
import getValidationErrors from '../../../../../utils/getValidationErrors'
import {
    HistoricalSiteProps,
    SiteProps
} from '../../../../../shared/model/site.model'
import { asyncHandler } from '../../../../../utils/asyncHandler'
import { IUser } from '../../../../../shared/model/user.model'
import { AUTH_TOKEN_KEY } from '../../../../../contexts/auth'
import { SiteCard } from '../../../../../components/SiteCard'
import { Textarea } from '../../../../../components/Textarea'
import { getAPIClient } from '../../../../../services/axios'
import { useToast } from '../../../../../hooks/use-toast'
import { Select } from '../../../../../components/Select'
import { Modal } from '../../../../../components/Modal'
import Head from '../../../../../infra/components/Head'
import { Input } from '../../../../../components/Input'
import OscarImage from '../../../../../assets/centro-cultural-oscar-niemeyer.jpg'
import CatedralImage from '../../../../../assets/catedral-de-brasilia.jpg'
import { isArrayEmpty, isObjectEmpty } from '../../../../../utils/isItEmpty'
import { Loading } from '../../../../../components/Loading'

const FlagType = {
    NEGADO: <StatusFlag colorType="red">Negado</StatusFlag>,
    EM_ANALISE: <StatusFlag colorType="blue">Em análise</StatusFlag>,
    ACEITO: <StatusFlag colorType="green">Aceito</StatusFlag>
}

const statusSelectOptions = [
    { label: 'Em análise', value: 'EM_ANALISE' },
    { label: 'Aceito', value: 'ACEITO' },
    { label: 'Negado', value: 'NEGADO' }
]

const SiteDatas: SiteProps[] = [
    {
        id: 1,
        position: [51.505, -0.09],
        description: ` O Centro Cultural Oscar Niemeyer é um centro cultural localizado
            na Praça do Pacificador, s/n, no Centro de Duque de Caxias, no Rio
            de Janeiro, no Brasil. Foi projetado por Oscar Niemeyer...`,
        image: OscarImage,
        title: 'Espaço Oscar Niemeyer',
        address: 'Praça dos Três Poderes - Brasília, DF, 70297-400'
    },
    {
        id: 2,
        position: [51.505, -0.1],
        description: `A Catedral Metropolitana - Nossa Senhora Aparecida,
            mais conhecida como Catedral de Brasília, é um
            templo católico brasileiro, na qual se encontra a
            cátedra da Arquidiocese de Brasília...`,
        image: CatedralImage,
        title: 'Catedral Metropolitana de Brasília',
        address: 'Lote 12 - Brasília, DF, 70050-000'
    }
]

const statusCase = {
    EM_ANALISE: 'Em análise',
    ACEITO: 'Aceito',
    NEGADO: 'Negado'
}

interface ComponentProps {
    userData: any
    userHistoricalSites: HistoricalSiteProps[]
}

interface UpdateFormType {
    comment: string
    statusSelect: string
    vrLink: string
}

function User({ userData, userHistoricalSites }: ComponentProps) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [user, setUser] = useState(userData)

    const [historicalSites, setHistoricalSites] = useState(userHistoricalSites)
    const [selectedSite, setSelectedSite] = useState({} as HistoricalSiteProps)
    const [isLoading, setIsLoading] = useState(false)

    const formModalRef = useRef<FormHandles>()
    const { addToast } = useToast()
    const router = useRouter()

    // console.log(userHistoricalSites)

    const schema = Yup.object({
        statusSelect: Yup.string().required('Status obrigatório'),
        comment: Yup.string(),
        vrLink: Yup.string().required('Link obrigatório')
    })

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false)
        setSelectedSite({} as HistoricalSiteProps)
    }, [])

    const handleOpenModal = useCallback(site => {
        setIsModalVisible(true)
        setSelectedSite(site)
    }, [])

    const handleFormSubmit: SubmitHandler<UpdateFormType> = async (
        data,
        { reset }
    ) => {
        try {
            reset()

            await schema.validate(data, {
                abortEarly: false
            })

            // Success validation
            setIsLoading(true)
            const { comment, vrLink, statusSelect } = data

            const response = await axios.put(
                `/api/admin/historical-sites/update?id=${selectedSite.id}`,
                {
                    comment,
                    link:
                        vrLink ||
                        `https://rv-history.vercel.app/3d-view?idHistoricalSite=${
                            selectedSite.id
                        }&year=${2020}`,
                    status: statusSelect
                }
            )

            if (response && response.data) {
                // console.log(response.data)
                const newHistoricalSite = response.data
                setHistoricalSites(prev => {
                    const filteredArray = prev.filter(
                        site => site.id !== newHistoricalSite.id
                    )

                    return [...filteredArray, newHistoricalSite]
                })
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(err)

                formModalRef.current?.setErrors(validationErrors)
            }
        } finally {
            setIsLoading(false)
            setIsModalVisible(false)
        }
    }

    return (
        <Container>
            <Head title={`Uploads de ${user.firstName} | RV History`} />
            <Modal isVisible={isModalVisible}>
                <ModalContainer>
                    <ModalCloseButton onClick={handleCloseModal}>
                        <StClose />
                    </ModalCloseButton>
                    <Form ref={formModalRef} onSubmit={handleFormSubmit}>
                        <h2>{selectedSite.name}</h2>
                        <ModalGridRow>
                            <div>
                                <h3>Imagens</h3>
                                <ModalSubItem>
                                    <ul>
                                        {selectedSite.siteImages?.map(item => (
                                            <li key={item.id}>
                                                <a
                                                    href={`data:image/jpeg;base64,${item.image3D}`}
                                                    download={`image_${item.id}`}
                                                >
                                                    image_{item.id}{' '}
                                                    <StDownLoad />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </ModalSubItem>
                            </div>

                            <div>
                                <h3>Status</h3>
                                <ModalSubItem>
                                    {!isObjectEmpty(selectedSite) && (
                                        <Select
                                            defaultValue={
                                                statusSelectOptions.filter(
                                                    opt =>
                                                        opt.value ===
                                                        selectedSite.status
                                                )[0]
                                            }
                                            name="statusSelect"
                                            id="statusSelect"
                                            instanceId="statusSelect"
                                            placeholder="Selecione..."
                                            options={statusSelectOptions}
                                        />
                                    )}
                                </ModalSubItem>
                            </div>
                        </ModalGridRow>

                        <ModalGridRow>
                            <div>
                                <h3>Comentário</h3>
                                <ModalSubItem>
                                    <Textarea
                                        name="comment"
                                        placeholder="Deixe seu comentário..."
                                        rows={8}
                                        maxLength={200}
                                        defaultValue={
                                            selectedSite.comment || ''
                                        }
                                    />
                                </ModalSubItem>
                            </div>

                            <div>
                                <h3>Link</h3>
                                <ModalSubItem>
                                    <Input
                                        Icon={StShare}
                                        name="vrLink"
                                        id="vrLink"
                                        placeholder="Ex: https://rv-history.vercel.app/..."
                                        defaultValue={`https://rv-history.vercel.app/3d-view?idHistoricalSite=${
                                            selectedSite.id
                                        }&year=${2020}`}
                                    />
                                </ModalSubItem>
                            </div>
                        </ModalGridRow>

                        <StButton toRight type="submit">
                            Enviar
                        </StButton>
                        <Loading isVisible={isLoading} />
                    </Form>
                </ModalContainer>
            </Modal>

            <h2>{user.firstName}'s informations</h2>
            <CardGrid>
                {historicalSites.map(site => (
                    <SiteCard
                        key={site.id}
                        status={site.status}
                        onClick={() => handleOpenModal(site)}
                        siteData={site}
                    />
                ))}
                {isArrayEmpty(historicalSites) && (
                    <strong>Não encontramos nenhum sítio</strong>
                )}
            </CardGrid>

            <Copy>&copy; 2021 RVHistory. All right reserved.</Copy>
        </Container>
    )
}

User.Layout = SidebarLayout

export default User

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { [AUTH_TOKEN_KEY]: token } = parseCookies(ctx)
    const api = getAPIClient(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    // Usuário(admin), é o esperado pelo menos
    const [userResponse, userError] = await asyncHandler<AxiosResponse<IUser>>(
        api.get('/api/account')
    )

    if (userResponse && !userResponse.data.authorities.includes('ROLE_ADMIN')) {
        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }

    const { params, query } = ctx

    const [userData, userDataError] = await asyncHandler<AxiosResponse<IUser>>(
        api.get(`/api/admin/users/${params['user']}`)
    )
    const [userHistoricalSites, error] = await asyncHandler(
        api.get(`/api/historical-sites/user/${query['userId']}`)
    )

    if (userDataError || error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            userData: userData.data,
            userHistoricalSites: userHistoricalSites.data
        }
    }
}
