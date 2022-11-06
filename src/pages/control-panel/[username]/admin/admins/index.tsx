import { useState, useCallback, useMemo, useContext } from 'react'
import { useContextSelector } from 'use-context-selector'
import { ThemeContext } from 'styled-components'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Column } from 'react-table'
import { useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

import {
    Container,
    Paper,
    Copy,
    ActionButtonContainer,
    ActButton,
    StEye,
    StAdd,
    StTrash,
    ModalCloseButton,
    StClose,
    ModalContainer,
    StButton
} from '../../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../../components/layouts/sidebar-layout'
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../../contexts/auth'
import { asyncHandler } from '../../../../../utils/asyncHandler'
import { IUser } from '../../../../../shared/model/user.model'
import { getAPIClient } from '../../../../../services/axios'
import { useToast } from '../../../../../hooks/use-toast'
import { Table } from '../../../../../components/Table'
import { Modal } from '../../../../../components/Modal'
import Head from '../../../../../infra/components/Head'

type CustomRow = {
    firstName: string
    login: string
    email: string
}
function Admins({ tableData }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState({} as CustomRow)
    const [data, setData] = useState(tableData || ([] as IUser[]))

    const { colors } = useContext(ThemeContext)

    const columns: Column<any>[] = useMemo(
        () => [
            {
                Header: 'Nome',
                accessor: 'firstName' // accessor is the "key" in the data
            },
            {
                Header: 'Apelido',
                accessor: 'login'
            },
            {
                Header: 'Email',
                accessor: 'email'
            }
        ],
        []
    )

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    const handleOpenModal = useCallback((row: any) => {
        setIsModalVisible(true)
        setSelectedRow(row)
    }, [])

    const ActionButtons = useCallback(
        ({ row }) => (
            <ActionButtonContainer>
                <ActButton
                    colorType="blue"
                    // onClick={() => {
                    //     push(
                    //         `/control-panel/${query.username}/admin/users/${row.login}`
                    //     )
                    // }}
                >
                    <StEye />
                   
                </ActButton>
                {/* <ActButton colorType="red" onClick={() => handleOpenModal(row)}>
                    <StTrash />
                </ActButton> */}
            </ActionButtonContainer>
        ),
        []
    )

    return (
        <Container>
            <Head title="Administradores | RV History" />
            <Modal isVisible={isModalVisible}>
                <ModalContainer
                    style={{
                        width: 'min(364px, 100%)'
                    }}
                >
                    <ModalCloseButton onClick={handleCloseModal}>
                        <StClose />
                    </ModalCloseButton>
                    <h3>
                        Quer mesmo excluir{' '}
                        <strong>{selectedRow.firstName}</strong>?
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StButton
                            color="transparent"
                            style={{ marginRight: '1.6rem' }}
                        >
                            Sim
                        </StButton>

                        <StButton onClick={handleCloseModal}>Não</StButton>
                    </div>
                </ModalContainer>
            </Modal>

            <Paper>
                <Table
                    columns={columns}
                    data={data}
                    actionButtons={useCallback(ActionButtons, [])}
                />

                {!data.length && <Copy>Nenhum dado encontrado</Copy>}
            </Paper>

            <Copy>&copy; 2021 RVHistory. All right reserved.</Copy>
        </Container>
    )
}

Admins.Layout = SidebarLayout

export default Admins

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

    const [response, error] = await asyncHandler<AxiosResponse<IUser[]>>(
        api.get('/api/admin/users')
    )

    if (response) {
        const filteredResponse = response.data.filter(item =>
            item.authorities.includes('ROLE_ADMIN')
        )

        return {
            props: {
                tableData: filteredResponse
            }
        }
    }

    return {
        props: {}
    }
}
