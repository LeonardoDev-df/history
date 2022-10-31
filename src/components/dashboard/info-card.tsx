import {
    Container,
    Divider,
    Footer,
    StClock,
    InfoMain,
    StBody,
    StHouse,
    IconContainer,
    BodyContainer
} from './styles'

const Icons = {
    body: <StBody />,
    house: <StHouse />
}

interface InfoProps {
    iconType: keyof typeof Icons
    colorType?: 'orange' | 'red' | 'blue' | 'green'
    title: string
    content: string
}

export function InfoCard({
    iconType,
    colorType = 'blue',
    title,
    content
}: InfoProps) {
    return (
        <Container>
            <InfoMain>
                <IconContainer colorType={colorType}>
                    {Icons[iconType]}
                </IconContainer>
                <div>
                    <p>{title}</p>
                    <h2>{content}</h2>
                </div>
            </InfoMain>

            <BodyContainer>
                <Footer>
                    <Divider />
                    <StClock />
                    <small>atualizado a 4 minutos atrás</small>
                </Footer>
            </BodyContainer>
        </Container>
    )
}
