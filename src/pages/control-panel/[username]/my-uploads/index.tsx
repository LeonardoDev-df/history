import { useState, useCallback } from 'react'
import { useContextSelector } from 'use-context-selector'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

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
    StClose
} from '../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../components/layouts/sidebar-layout'
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../contexts/auth'
import { SiteCard } from '../../../../components/SiteCard'
import { Modal } from '../../../../components/Modal'
import Head from '../../../../infra/components/Head'
import { SiteProps } from '../../../../shared/model/user.model'
import CatedralImage from '../../../../assets/catedral-de-brasilia.jpg'
import OscarImage from '../../../../assets/centro-cultural-oscar-niemeyer.jpg'

const FlagType = {
    denied: <StatusFlag colorType="red">Negado</StatusFlag>,
    underReview: <StatusFlag colorType="blue">Em análise</StatusFlag>,
    accepted: <StatusFlag colorType="green">Aceito</StatusFlag>
}

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

function MyUploads() {
    // const { account } = useAuth()]
    const account = useContextSelector(AuthContext, c => c.account)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    return (
        <Container>
            <Head title="Meus uploads | RV History" />
            <Modal isVisible={isModalVisible}>
                <ModalContainer>
                    <ModalCloseButton onClick={handleCloseModal}>
                        <StClose />
                    </ModalCloseButton>
                    <h2>Catedral Metropolitana de Brasília</h2>
                    <ModalGridRow>
                        <div>
                            <h3>Imagens</h3>
                            <ModalSubItem>
                                <ul>
                                    <li>
                                        <a href="#">
                                            10-12-2020-asddd.jpeg <StDownLoad />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            10-12-2020-asdd.jpeg <StDownLoad />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            10-12-2020-asdd.jpeg <StDownLoad />
                                        </a>
                                    </li>
                                </ul>
                            </ModalSubItem>
                        </div>

                        <div>
                            <h3>Status</h3>
                            <ModalSubItem>{FlagType['denied']}</ModalSubItem>
                        </div>
                    </ModalGridRow>
                    <ModalGridRow>
                        <div>
                            <h3>Link</h3>
                            {/* <ModalSubItem> */}
                            <a href="#" style={{ marginLeft: '1.6rem' }}>
                                <StShare />
                                http://amazon-awss3.com/vr/catedral-metropolitana-de-brasília
                            </a>
                            {/* </ModalSubItem> */}
                        </div>
                    </ModalGridRow>
                </ModalContainer>
            </Modal>

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

MyUploads.Layout = SidebarLayout

export default MyUploads

export const getServerSideProps: GetServerSideProps = async ctx => {
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
        props: {}
    }
}
