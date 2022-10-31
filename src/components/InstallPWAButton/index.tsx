import { HTMLAttributes } from 'react'

import { Container, StDownload } from './styles'

export function InstallPWAButton(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <Container {...props}>
            <StDownload />
        </Container>
    )
}
