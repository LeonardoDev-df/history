import { useState, useCallback, useMemo, useContext } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { AxiosResponse } from 'axios'
import { ThemeContext } from 'styled-components'
import { Column } from 'react-table'

import {
    Container,
    Paper,
    Copy,
    ActionButtonContainer,
    ActButton,
    StEye,
    StTrash,
    ModalContainer,
    ModalCloseButton,
    StClose,
    ModalGridRow,
    StButton
} from '../../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../../components/layouts/sidebar-layout'
import { asyncHandler } from '../../../../../utils/asyncHandler'
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../../contexts/auth'
import { useToast } from '../../../../../hooks/use-toast'
import { Table } from '../../../../../components/Table'
import { Modal } from '../../../../../components/Modal'
// import { Button } from '../../../../../components/Button'
import Head from '../../../../../infra/components/Head'
import { IUser } from '../../../../../shared/model/user.model'
import { getAPIClient } from '../../../../../services/axios'

type CustomRow = {
    firstName: string
    login: string
    email: string
}

function Users({ tableData }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState({} as CustomRow)
    const [data, setData] = useState(tableData || ([] as IUser[]))

    const { colors } = useContext(ThemeContext)
    const { push, query } = useRouter()

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
                    onClick={() => {
                        push(
                            `/control-panel/${query.username}/admin/users/${row.login}`
                        )
                    }}
                >
                    <StEye />
                </ActButton>
                <ActButton colorType="red" onClick={() => handleOpenModal(row)}>
                    <StTrash />
                </ActButton>
            </ActionButtonContainer>
        ),
        []
    )

    return (
        <Container>
            <Head title="Usuários | RV History" />
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '1.6rem'
                        }}
                    >
                        <StButton
                            tintColor={colors.primary}
                            color="transparent"
                            style={{ marginRight: '.8rem' }}
                        >
                            Sim
                        </StButton>

                        <StButton
                            color={colors.primary}
                            onClick={handleCloseModal}
                        >
                            Não
                        </StButton>
                    </div>
                </ModalContainer>
            </Modal>

            <Paper>
                <Table
                    columns={columns}
                    data={data}
                    actionButtons={useCallback(ActionButtons, [])}
                />
            </Paper>

            <Copy>&copy; 2021 RVHistory. All right reserved.</Copy>
        </Container>
    )
}

Users.Layout = SidebarLayout

export default Users

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
                destination: '/404',
                permanent: false
            }
        }
    }

    const [response, error] = await asyncHandler<AxiosResponse<IUser[]>>(
        api.get('/api/admin/users')
    )

    if (response) {
        const filteredResponse = response.data.filter(
            item => !item.authorities.includes('ROLE_ADMIN')
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
