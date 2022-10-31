import { useRef, useState } from 'react'

import { GetServerSideProps } from 'next'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import {
    Container,
    Card,
    StPassword,
    StPasswordAlt
} from '../../../styles/pages/shared/account.styles'
import getValidationErrors from '../../../utils/getValidationErrors'
import { useToast } from '../../../hooks/use-toast'
import { ToastLayout } from '../../../components/layouts/toastLayout'
import { Loading } from '../../../components/Loading'
import { Button } from '../../../components/Button'
import Head from '../../../infra/components/Head'
import { Input } from '../../../components/Input'
import { api } from '../../../services/api'

interface FormData {
    newPassword: string
    confirmNewPassword: string
}

function finishPasswordReset({ pageKey }) {
    const formRef = useRef<FormHandles>()
    const [isLoading, setIsLoading] = useState(false)
    const { addToast } = useToast()
    const route = useRouter()

    const schema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Senha obrigatório')
            .min(8, 'No mínimo 8 dígitos'),
        confirmNewPassword: Yup.string()
            .required('Confirme sua senha')
            .when('newPassword', {
                is: (val: string) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('newPassword')],
                    'As senhas não combinam'
                )
            })
    })

    const handleValidSubmit: SubmitHandler<FormData> = async (
        { newPassword, confirmNewPassword },
        { reset }
    ) => {
        reset()

        try {
            await schema.validate(
                { newPassword, confirmNewPassword },
                { abortEarly: false }
            )

            // função para iniciar o processo de resetar senha
            setIsLoading(true)
            await api.post('/api/password-reset/finish', {
                key: pageKey,
                newPassword
            })
            addToast({
                title: 'Sucesso!!!',
                type: 'success',
                description: 'Senha resetada com sucesso'
            })
            route.push('/signIn')
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(error)

                formRef.current?.setErrors(validationErrors)

                return
            }

            addToast({
                title: 'Eita',
                type: 'error',
                description:
                    'Parece que houve um erro ao tentar resetar a senha'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Head title="Resetar senha | RV History" />

            <Card>
                <h1>Reseta senha</h1>
                <Form ref={formRef} onSubmit={handleValidSubmit}>
                    <div style={{ marginTop: '1.6rem' }}>
                        <label htmlFor="newPassword">Nova senha</label>
                        <Input
                            name="newPassword"
                            id="newPassword"
                            placeholder="********"
                            type="password"
                            Icon={StPassword}
                        />
                    </div>

                    <div style={{ marginTop: '1.6rem' }}>
                        <label htmlFor="confirmNewPassword">
                            Confirmar nova senha
                        </label>
                        <Input
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            placeholder="********"
                            type="password"
                            Icon={StPasswordAlt}
                        />
                    </div>

                    <Button style={{ marginTop: '2.4rem' }} type="submit">
                        Validar nova senha
                    </Button>
                </Form>
            </Card>

            <Loading isVisible={isLoading} type="overlay" />
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { query } = ctx

    if (!query.key) {
        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }

    return {
        props: {
            pageKey: query.key
        }
    }
}

finishPasswordReset.Layout = ToastLayout

export default finishPasswordReset
