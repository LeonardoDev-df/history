import { useState, useCallback, useMemo, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
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
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../../contexts/auth'
import { asyncHandler } from '../../../../../utils/asyncHandler'
import { IUser } from '../../../../../shared/model/user.model'
import { getAPIClient } from '../../../../../services/axios'
import { Loading } from '../../../../../components/Loading'
import { useToast } from '../../../../../hooks/use-toast'
import { Table } from '../../../../../components/Table'
import { Modal } from '../../../../../components/Modal'
import Head from '../../../../../infra/components/Head'

type CustomRow = {
    firstName: string
    login: string
    email: string
    id: number
}

function Users({ tableData }) {
    const [selectedRow, setSelectedRow] = useState({} as CustomRow)
    const [data, setData] = useState(tableData || ([] as IUser[]))
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { colors } = useContext(ThemeContext)
    const { push, query } = useRouter()
    const { addToast } = useToast()

    console.log(tableData)

    const columns: Column<any>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id' // accessor is the "key" in the data
            },
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

    const handleUserDelete = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await axios.delete(
                `/api/admin/delete-user?login=${selectedRow.login}`
            )

            addToast({
                title: 'Deletado!',
                description: 'Usuário deletado com sucesso',
                type: 'success'
            })
        } catch (e) {
            addToast({
                title: 'Eita!!!',
                description:
                    'Não conseguimos deletar este usuário, por favor tente novamente',
                type: 'error'
            })
        } finally {
            setIsLoading(false)
            setIsModalVisible(false)
            handleTableUpdate()
        }
    }, [selectedRow])

    const handleTableUpdate = useCallback(async () => {
        const [response, error] = await asyncHandler(
            axios.get<IUser[]>('/api/admin/get-users')
        )

        if (response && response.data) {
            setData(response.data)
        }
    }, [])

    const ActionButtons = useCallback(
        ({ row }) => (
            <ActionButtonContainer>
                <ActButton
                    colorType="blue"
                    onClick={() => {
                        push(
                            `/control-panel/${query.username}/admin/users/${row.login}?userId=${row.id}`
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
                            onClick={handleUserDelete}
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

            <Loading isVisible={isLoading} />

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
