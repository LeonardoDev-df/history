import { useState, useCallback, useRef } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { AxiosResponse } from 'axios'
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
import { asyncHandler } from '../../../../../utils/asyncHandler'
import { IUser, SiteProps } from '../../../../../shared/model/user.model'
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

const FlagType = {
    denied: () => <StatusFlag colorType="red">Negado</StatusFlag>,
    underReview: () => <StatusFlag colorType="blue">Em análise</StatusFlag>,
    accepted: () => <StatusFlag colorType="green">Aceito</StatusFlag>
}

const statusSelectOptions = [
    { label: 'Em análise', value: 'under review' },
    { label: 'Aceito', value: 'accepted' },
    { label: 'Negado', value: 'denied' }
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
function User({ userData }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [user, setUser] = useState(userData)

    const formModalRef = useRef<FormHandles>()
    const { addToast } = useToast()
    const router = useRouter()

    const schema = Yup.object({
        statusSelect: Yup.string().required('Status obrigatório'),
        comment: Yup.string(),
        vrLink: Yup.string().required('Link obrigatório')
    })

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    const handleFormSubmit: SubmitHandler<FormData> = async (
        data,
        { reset }
    ) => {
        try {
            reset()

            await schema.validate(data, {
                abortEarly: false
            })

            // Success validation
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(err)

                formModalRef.current?.setErrors(validationErrors)
            }
        }
    }

    return (
        <Container>
            <Head title="Meus uploads | RV History" />
            <Modal isVisible={isModalVisible}>
                <ModalContainer>
                    <ModalCloseButton onClick={handleCloseModal}>
                        <StClose />
                    </ModalCloseButton>
                    <Form ref={formModalRef} onSubmit={handleFormSubmit}>
                        <h2>Catedral Metropolitana de Brasília</h2>
                        <ModalGridRow>
                            <div>
                                <h3>Imagens</h3>
                                <ModalSubItem>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                10-12-2020-asddd.jpeg{' '}
                                                <StDownLoad />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                10-12-2020-asdd.jpeg{' '}
                                                <StDownLoad />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                10-12-2020-asdd.jpeg{' '}
                                                <StDownLoad />
                                            </a>
                                        </li>
                                    </ul>
                                </ModalSubItem>
                            </div>

                            <div>
                                <h3>Status</h3>
                                <ModalSubItem>
                                    <Select
                                        options={statusSelectOptions}
                                        defaultValue={{
                                            label: 'Em análise',
                                            value: 'under review'
                                        }}
                                        name="statusSelect"
                                        id="statusSelect"
                                        instanceId="statusSelect"
                                        placeholder="Selecione..."
                                    />
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
                                    />
                                </ModalSubItem>
                            </div>
                        </ModalGridRow>

                        <StButton toRight type="submit">
                            Enviar
                        </StButton>
                    </Form>
                </ModalContainer>
            </Modal>

            <h2>{user.firstName}'s informations</h2>
            <CardGrid>
                {SiteDatas.map(site => (
                    <SiteCard
                        status="denied"
                        onClick={() => setIsModalVisible(true)}
                        siteData={site}
                    />
                ))}
                {[0, 0].map(item => (
                    <div style={{ opacity: 0 }} />
                ))}
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

    const { params } = ctx

    const [response, error] = await asyncHandler<AxiosResponse<IUser>>(
        api.get(`/api/admin/users/${params['user']}`)
    )

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            userData: response.data
        }
    }
}
