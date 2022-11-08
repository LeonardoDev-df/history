import { useContextSelector } from 'use-context-selector'
import { useState, useCallback, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import axios from 'axios'

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
import {
    SiteProps,
    HistoricalSiteProps
} from '../../../../shared/model/site.model'
import { SiteCard } from '../../../../components/SiteCard'
import { Loading } from '../../../../components/Loading'
import { isArrayEmpty } from '../../../../utils/isItEmpty'
import Head from '../../../../infra/components/Head'
import { Modal } from '../../../../components/Modal'

import CatedralImage from '../../../../assets/catedral-de-brasilia.jpg'
import OscarImage from '../../../../assets/centro-cultural-oscar-niemeyer.jpg'

const FlagType = {
    EM_ANALISE: <StatusFlag colorType="blue">Em análise</StatusFlag>,
    NEGADO: <StatusFlag colorType="red">Negado</StatusFlag>,
    ACEITO: <StatusFlag colorType="green">Aceito</StatusFlag>
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
    const [historicalSites, setHistoricalSites] = useState(
        [] as HistoricalSiteProps[]
    )
    const [selectedSite, setSelectedSite] = useState({} as HistoricalSiteProps)
    const [isLoading, setIsLoading] = useState(false)

    const account = useContextSelector(AuthContext, c => c.account)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false)
    }, [])
    const handleOpenModal = useCallback(site => {
        setIsModalVisible(true)
        setSelectedSite(site)
    }, [])

    useEffect(() => {
        async function getUserHistoricalSites() {
            setIsLoading(true)
            try {
                const response = await axios.get('/api/historical-sites/get', {
                    params: {
                        idUser: account.id
                    }
                })

                if (response && response.data) {
                    setHistoricalSites(response.data)
                }
            } catch (error) {
                // handling
            } finally {
                setIsLoading(false)
            }
        }

        if (account && account.id) {
            getUserHistoricalSites()
        }
    }, [account])

    console.log(historicalSites)

    return (
        <Container>
            <Head title="Meus uploads | RV History" />
            <Modal isVisible={isModalVisible}>
                <ModalContainer>
                    <ModalCloseButton onClick={handleCloseModal}>
                        <StClose />
                    </ModalCloseButton>
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
                                                image_{item.id} <StDownLoad />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </ModalSubItem>
                        </div>

                        <div>
                            <h3>Status</h3>
                            <ModalSubItem>
                                {FlagType[selectedSite.status]}
                            </ModalSubItem>
                        </div>
                    </ModalGridRow>
                    <ModalGridRow>
                        <div>
                            <h3>Link</h3>
                            {/* <ModalSubItem> */}
                            <a
                                href={`/3d-view?idHistoricalSite=${
                                    selectedSite.id
                                }&year=${2021}`}
                                style={{ marginLeft: '1.6rem' }}
                            >
                                <StShare />
                                http://rv-history/3d-view?idHistoricalSite=
                                {selectedSite.id}&year=2021
                            </a>
                            {/* </ModalSubItem> */}
                        </div>
                    </ModalGridRow>
                </ModalContainer>
            </Modal>

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
            <Loading isVisible={isLoading} />
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
