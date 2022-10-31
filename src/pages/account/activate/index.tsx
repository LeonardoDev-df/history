import Head from '../../../infra/components/Head'
import Link from '../../../infra/components/Link'
import { getAPIClient } from '../../../services/axios'
import {
    Container,
    Card,
    Alert
} from '../../../styles/pages/shared/account.styles'
import { GetServerSideProps } from 'next'

function Activate({ hasFailed }) {
    const FailureAlert = () => (
        <Alert color="danger">
            <h2>Falha!!!</h2>
            <strong>Sua conta não pôde ser ativada.</strong> Por favor{' '}
            <Link href="/signUp">Cadastre-se</Link>
        </Alert>
    )

    const SuccessAlert = () => (
        <Alert color="success">
            <h2>Sucesso!!!</h2>
            <strong>Sua conta foi ativada!!!</strong> Por favor{' '}
            <Link href="/signIn">Logue na aplicação</Link>
        </Alert>
    )

    return (
        <Container>
            <Head title="Ativar conta | RV History" />

            <Card>
                <h1>Ativação</h1>
                {hasFailed && <FailureAlert />}
                {!hasFailed && <SuccessAlert />}
            </Card>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const api = getAPIClient(ctx)
    const { query } = ctx

    if (!query.key) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    try {
        await api.get('/api/activate', {
            params: {
                key: query.key
            }
        })

        return {
            props: {
                hasFailed: false
            }
        }
    } catch (error) {
        return {
            props: {
                hasFailed: true
            }
        }
    }
}

export default Activate
