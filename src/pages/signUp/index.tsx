import { useState, useRef } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'

import {
    Container,
    StGoogle,
    StEmail,
    StPassword,
    StPasswordAlt,
    StUser,
    StCalendar,
    StForm,
    Header,
    StUserAlt
} from '../../styles/pages/signUp'
import { CustomDatePicker as DatePicker } from '../../components/DatePicker'
import { CustomCheckbox as Checkbox } from '../../components/Checkbox'
import getValidationErrors from '../../utils/getValidationErrors'
import { AuthLayout } from '../../components/layouts/auth'
import { Button } from '../../components/Button'
import Link from '../../infra/components/Link'
import { Input } from '../../components/Input'
import Head from '../../infra/components/Head'
import { useToast } from '../../hooks/use-toast'
import { Loading } from '../../components/Loading'

interface FormData {
    email: string
    username: string
    firstName: string
    password: string
    dateOfBirth: Date
    privacy: boolean
}

function signUp() {
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormHandles>()
    const { addToast } = useToast()
    const route = useRouter()

    const schema = Yup.object({
        privacy: Yup.boolean().oneOf([true], 'Opa aceita ae man kkkk')
    }).shape({
        username: Yup.string().required('Coloque seu username'),
        firstName: Yup.string().required('Coloque seu nome'),
        email: Yup.string()
            .email('Não é um email válido')
            .required('Email obrigatório'),
        password: Yup.string()
            .required('Senha obrigatório')
            .min(8, 'No mínimo 8 dígitos'),
        confirmPassword: Yup.string()
            .required('Confirme sua senha')
            .when('password', {
                is: (val: string) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'As senhas não combinam'
                )
            }),
        dateOfBirth: Yup.date()
            .nullable()
            .transform((curr, orig) => (orig === '' ? null : curr))
            .required('Poe ae man kkkk')
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
            const { dateOfBirth, email, password, username, firstName } = data

            setIsLoading(true)
            await axios.post('/api/register', {
                firstName,
                login: username, // *
                email,
                password,
                dateOfBirth,
                langKey: navigator.language
            })

            addToast({
                type: 'success',
                title: 'Sucesso! Agora ative sua conta',
                description: 'Aceesse seu email para ativar sua conta'
            })

            //route.back() Ou route.push('/signIn')
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Validation failed
                const validationErrors = getValidationErrors(err)

                formRef.current?.setErrors(validationErrors)

                return
            }

            addToast({
                type: 'error',
                title: 'Ocorreu um erro durante o cadastro',
                description: 'Não foi possível fazer cadastro na aplicação'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Head title="Cadastro | RV History" />

            <div>
                <Header>
                    <h1>Criar conta</h1>
                    {/* <Button
                        style={{
                            fontSize: '1.2rem',
                            width: 'min(80%, 100%)',
                            height: '4rem',
                            opacity: 0.5
                        }}
                        color="white"
                        tintColor="#363636"
                        Icon={StGoogle}
                        disabled={true}
                    >
                        Cadastrar com o google
                    </Button> */}
                </Header>

                {/* Inputs */}
                <StForm ref={formRef} onSubmit={handleFormSubmit}>
                    <section>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <Input
                                name="email"
                                id="email"
                                Icon={StEmail}
                                placeholder="janeDoe@email.com"
                                themeType="light"
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName">Nome</label>
                            <Input
                                name="firstName"
                                id="firstName"
                                Icon={StUserAlt}
                                placeholder="Ex: Jane"
                                themeType="light"
                            />
                        </div>
                    </section>

                    <section>
                        <div>
                            <label htmlFor="name">Username</label>
                            <Input
                                name="username"
                                id="name"
                                Icon={StUser}
                                placeholder="Ex: jane123"
                                themeType="light"
                            />
                        </div>

                        <div>
                            <label htmlFor="dateOfBirth">
                                Data de nascimento
                            </label>
                            <DatePicker name="dateOfBirth" Icon={StCalendar} />
                        </div>
                    </section>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <Input
                            name="password"
                            id="password"
                            Icon={StPassword}
                            placeholder="********"
                            type="password"
                            themeType="light"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <Input
                            name="confirmPassword"
                            id="confirmPassword"
                            Icon={StPasswordAlt}
                            placeholder="********"
                            type="password"
                            themeType="light"
                        />
                    </div>

                    <Checkbox name="privacy" value="consent">
                        Eu concordo com os{' '}
                        <Link href="#">
                            <span>Termos</span>
                        </Link>{' '}
                        e{' '}
                        <Link href="#">
                            <span>Políticas de Privacidade</span>
                        </Link>
                    </Checkbox>

                    <Button style={{ marginTop: '2.4rem' }} type="submit">
                        Criar
                    </Button>
                </StForm>
                <small>
                    Já possui uma conta?{' '}
                    <Link href="/signIn">
                        <span>Login</span>
                    </Link>
                </small>
            </div>

            <Loading isVisible={isLoading} type="overlay" />
        </Container>
    )
}

signUp.Layout = AuthLayout

export default signUp
