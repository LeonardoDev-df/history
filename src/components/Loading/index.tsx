import { CSSProperties } from 'react'
import {
    Container,
    StLoader,
    StSpinnerLoader,
    StSpinnerLoaderTwo
} from './styles'

type LoadingProps = {
    isVisible: boolean
    style?: CSSProperties
    type?: 'overlay' | 'no-overlay'
    loaderType?: 'complex' | 'spinner' | 'spinner2'
}

const loader = {
    complex: () => <StLoader />,
    spinner: () => <StSpinnerLoader />,
    spinner2: () => <StSpinnerLoaderTwo />
}

export const Loading: React.FC<LoadingProps> = ({
    isVisible,
    style,
    type = 'overlay',
    loaderType = 'spinner2'
}) => {
    return (
        <Container show={isVisible} style={style} type={type}>
            {loader[loaderType]()}
        </Container>
    )
}
