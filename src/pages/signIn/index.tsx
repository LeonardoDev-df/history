import { useRef, useContext } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import * as Yup from 'yup'

import Head from '../../infra/components/Head'
import Link from '../../infra/components/Link'
import {
    Container,
    StGoogle,
    StEmail,
    StPassword,
    StForm,
    StUser
} from '../../styles/pages/signIn'
import getValidationErrors from '../../utils/getValidationErrors'
import { AUTH_TOKEN_KEY, AuthContext } from '../../contexts/auth'
import { asyncHandler } from '../../utils/asyncHandler'
import { getAPIClient } from '../../services/axios'
import { AuthLayout } from '../../components/layouts/auth'
import { useLoginAuth } from '../../hooks/use-login-auth'
import { Loading } from '../../components/Loading'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { FormHandles, SubmitHandler } from '@unform/core'
import { AxiosResponse } from 'axios'
import { IUser } from '../../shared/model/user.model'

interface FormData {
    username: string
    password: string
}

function signIn() {
    const formRef = useRef<FormHandles>()
    const { login, isLoading } = useLoginAuth()
    // const { signIn, isLoading, account } = useContext(AuthContext)

    const schema = Yup.object({
        username: Yup.string().required('Username obrigatório'),
        password: Yup.string().required('Senha obrigatório')
    })

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
            await login(data)
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(err)

                formRef.current?.setErrors(validationErrors)
            }
        }
    }

    return (
        <Container>
            <Head title="Login | RV History" />

            <div>
                <h1>Logar</h1>

                {/* Inputs */}
                <StForm ref={formRef} onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Input
                            name="username"
                            id="username"
                            Icon={StUser}
                            placeholder="janes"
                            themeType="light"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Input
                            name="password"
                            id="password"
                            Icon={StPassword}
                            placeholder="********"
                            type="password"
                            themeType="light"
                        />
                    </div>

                    <Link href="/account/password-reset">
                        <small>Esqueceu a senha?</small>
                    </Link>

                    <Button style={{ marginTop: '2.4rem' }} type="submit">
                        Entrar
                    </Button>
                </StForm>

                {/* <span>
                    <div /> <p>Ou</p> <div />
                </span>

                <Button
                    color="white"
                    tintColor="#363636"
                    Icon={StGoogle}
                    disabled={true}
                    style={{ opacity: 0.5 }}
                >
                    Logar com Google
                </Button> */}
                <small>
                    Não possui uma conta?{' '}
                    <Link href="/signUp">
                        <span>Cadastro</span>
                    </Link>
                </small>
            </div>

            <Loading isVisible={isLoading} />
        </Container>
    )
}

// Qual o layout
signIn.Layout = AuthLayout

export default signIn

export const getServerSideProps: GetServerSideProps = async ctx => {
    // Verificar se existe user
    const { [AUTH_TOKEN_KEY]: token } = parseCookies(ctx)

    if (token) {
        const api = getAPIClient(ctx)
        const [response, error] = await asyncHandler<AxiosResponse<IUser>>(
            api.get('/api/account')
        )

        if (response && response.data) {
            return {
                redirect: {
                    destination: `/control-panel/${response.data.login}/profile`,
                    permanent: false
                }
            }
        }

        return {
            props: {}
        }
    }

    return {
        props: {}
    }
}
