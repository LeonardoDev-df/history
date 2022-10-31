import { useRef, useState, useCallback } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import axios from 'axios'

import {
    Paper,
    FormGroup,
    StPassword,
    StPasswordAlt,
    StButton
} from '../../styles/pages/shared/control-panel.styles'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/use-toast'
import { Loading } from '../../components/Loading'
import { Input } from '../Input'

interface PasswordData {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

interface Props {
    // buttonColor: string
}

export function PasswordChange({}: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormHandles>()

    const { addToast } = useToast()

    const schema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('Senha atual obrigatório')
            .min(8, 'No mínimo 8 dígitos'),
        newPassword: Yup.string()
            .required('Nova senha obrigatório')
            .min(8, 'No mínimo 8 dígitos'),
        confirmNewPassword: Yup.string()
            .required('Confirme a senha')
            .when('newPassword', {
                is: (val: string) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('newPassword')],
                    'As senhas não combinam'
                )
            })
    })

    const handleFormSubmit: SubmitHandler<PasswordData> = useCallback(
        async (data, { reset }) => {
            try {
                reset()

                await schema.validate(data, {
                    abortEarly: false
                })

                // Success validation
                const { currentPassword, newPassword } = data

                setIsLoading(true)
                await axios.post('/api/change-password', {
                    currentPassword,
                    newPassword
                })

                addToast({
                    type: 'success',
                    title: 'Sucesso!',
                    description: 'Senha atualizada com sucesso'
                })
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    // Validation failed
                    const validationErrors = getValidationErrors(err)

                    formRef.current?.setErrors(validationErrors)

                    return
                }

                addToast({
                    type: 'error',
                    title: 'Ocorreu um erro durante a atulização',
                    description: 'Não foi possível fazer a mudança de senha'
                })
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    return (
        <Paper>
            <h2 style={{ marginBottom: '1.6rem' }}>Atualizar senha</h2>
            <Form ref={formRef} onSubmit={handleFormSubmit}>
                <FormGroup>
                    <label htmlFor="currentPassword">Senha atual</label>
                    <Input
                        name="currentPassword"
                        id="currentPassword"
                        placeholder="********"
                        type="password"
                        Icon={StPassword}
                    />
                </FormGroup>
                <FormGroup mult>
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
                </FormGroup>

                <StButton toRight>Enviar</StButton>
            </Form>

            <Loading isVisible={isLoading} />
        </Paper>
    )
}
