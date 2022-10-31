import { useContext, useEffect, useRef, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { FormHandles, SubmitHandler } from '@unform/core'
import { ThemeContext } from 'styled-components'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import axios from 'axios'

import {
    Container,
    Paper,
    PseudoInput,
    StUser,
    StUserAlt,
    StEmail,
    FormGroup,
    StButton,
    Copy
} from '../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../components/layouts/sidebar-layout'
import { PasswordChange } from '../../../../components/PasswordChange'
import { Loading } from '../../../../components/Loading'
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../contexts/auth'
import { useToast } from '../../../../hooks/use-toast'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { Input } from '../../../../components/Input'
import Head from '../../../../infra/components/Head'

type FormUpData = {
    usernameUp: string
    firstNameUp: string
    emailUp: string
}

function Profile({ userData }) {
    const [isLoading, setIsLoading] = useState(false)
    const account = useContextSelector(AuthContext, c => c.account)
    const setUserData = useContextSelector(AuthContext, c => c.setUserData)
    const { colors } = useContext(ThemeContext)
    const formUpRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const schema = Yup.object({
        usernameUp: Yup.string().required('Username obrigatório'),
        firstNameUp: Yup.string().required('Nome obrigatório'),
        emailUp: Yup.string().required('Email obrigatório')
    })

    useEffect(() => {
        if (typeof userData === 'object' && Object.keys(userData).length > 0) {
            setUserData(userData)
        }
    }, [])

    const handleFormSubmit: SubmitHandler<FormUpData> = async (
        data,
        { reset }
    ) => {
        setIsLoading(true)
        try {
            reset()

            await schema.validate(data, {
                abortEarly: false
            })

            // Success validation
            const { login, firstName, email } = account
            const { usernameUp, firstNameUp, emailUp } = data
            const equal =
                login === usernameUp &&
                firstName === firstNameUp &&
                email === emailUp

            if (equal) {
                return
            }

            // API
            const mergedAccount = {
                ...account,
                login: usernameUp,
                firstName: firstNameUp,
                email: emailUp
            }

            const response = await axios.post('/api/update-account', {
                account: mergedAccount
            })
            if (response && response.data) {
                setUserData(response.data)
                addToast({
                    title: 'Sucesso!!!',
                    description: 'Dados atualizados com sucesso',
                    type: 'success'
                })
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(err)

                formUpRef.current?.setErrors(validationErrors)
            }

            addToast({
                title: 'Oops!!!',
                description:
                    'Não foi possível atualizar seus dados. Tente novamente',
                type: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Head title="Perfil | RV History" />

            <Paper>
                <PseudoInput>
                    <span>Username </span>
                    {account.login}
                </PseudoInput>

                <PseudoInput>
                    <span>Nome </span>
                    {account.firstName}
                </PseudoInput>

                <PseudoInput>
                    <span>E-mail </span>
                    {account.email}
                </PseudoInput>
            </Paper>

            <Paper>
                <h2 style={{ marginBottom: '1.6rem' }}>Atualizar dados</h2>
                <Form ref={formUpRef} onSubmit={handleFormSubmit}>
                    <FormGroup mult={true}>
                        <div>
                            <label htmlFor="usernameUp">Username</label>

                            <Input
                                name="usernameUp"
                                id="usernameUp"
                                placeholder="liljane123"
                                defaultValue={
                                    account.login ? account.login : ''
                                }
                                Icon={StUser}
                            />
                        </div>

                        <div>
                            <label htmlFor="firstNameUp">Nome</label>
                            <Input
                                name="firstNameUp"
                                id="firstNameUp"
                                placeholder="Jane Doe"
                                defaultValue={
                                    account.firstName ? account.firstName : ''
                                }
                                Icon={StUserAlt}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="emailUp">Email</label>
                        <Input
                            name="emailUp"
                            id="emailUp"
                            placeholder="janedoe@email.com"
                            defaultValue={account.email ? account.email : ''}
                            Icon={StEmail}
                        />
                    </FormGroup>

                    <StButton type="submit" toRight>
                        Enviar
                    </StButton>
                </Form>
                <Loading isVisible={isLoading} />
            </Paper>

            <PasswordChange />

            <Copy>&copy; 2021 RVHistory. All right reserved.</Copy>
        </Container>
    )
}

Profile.Layout = SidebarLayout

export default Profile

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

    // try {
    //     const api = getAPIClient(ctx)

    //     const response = await api.get('/api/account')

    //     return {
    //         props: {
    //             userData: response.data
    //         }
    //     }
    // } catch (error) {

    //     return {
    //         props: {}
    //     }
    // }

    return {
        props: {}
    }
}
