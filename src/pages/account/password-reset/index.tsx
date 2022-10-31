import { useRef, useState } from 'react'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as yup from 'yup'

import { ToastLayout } from '../../../components/layouts/toastLayout'
import getValidationErrors from '../../../utils/getValidationErrors'
import {
    Container,
    Alert,
    Card,
    StEmail
} from '../../../styles/pages/shared/account.styles'
import { Loading } from '../../../components/Loading'
import { Button } from '../../../components/Button'
import Head from '../../../infra/components/Head'
import { Input } from '../../../components/Input'
import { useToast } from '../../../hooks/use-toast'
import { api } from '../../../services/api'

function initPasswordReset() {
    const formRef = useRef<FormHandles>()
    const [isLoading, setIsLoading] = useState(false)
    const { addToast } = useToast()

    const schema = yup.object().shape({
        PREmail: yup
            .string()
            .required('Email obrigatório')
            .email('Email inválido')
    })

    const handleValidSubmit: SubmitHandler<{ PREmail: string }> = async (
        { PREmail },
        { reset }
    ) => {
        reset()

        try {
            await schema.validate({ PREmail }, { abortEarly: false })

            // função para iniciar o processo de resetar senha
            setIsLoading(true)
            await api.post('/api/password-reset/init', { email: PREmail })
            addToast({
                title: 'Sucesso!!!',
                type: 'success',
                description:
                    'Pedido relizado com sucesso, agora olhe no seu email e acesse o link para resetar sua senha'
            })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(error)

                formRef.current?.setErrors(validationErrors)
            }

            addToast({
                title: 'Eita',
                type: 'error',
                description:
                    'Parece que houve um erro ao tentar pedir para resetar a senha'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Head title="Resetar senha | RV History" />

            <Card>
                <h1>Resete sua senha</h1>
                {/* Alert */}
                <Alert color="warning">
                    <h2>Cuidado!</h2>
                    <p>Coloque o email que usou no cadastro.</p>
                </Alert>

                <Form ref={formRef} onSubmit={handleValidSubmit}>
                    <div>
                        <label htmlFor="PREmail">E-mail</label>
                        <Input
                            name="PREmail"
                            id="PREmail"
                            placeholder="janedoe@email.com"
                            Icon={StEmail}
                        />
                    </div>

                    <Button style={{ marginTop: '2.4rem' }} type="submit">
                        Resetar senha
                    </Button>
                </Form>
            </Card>

            <Loading isVisible={isLoading} type="overlay" />
        </Container>
    )
}

initPasswordReset.Layout = ToastLayout

export default initPasswordReset
