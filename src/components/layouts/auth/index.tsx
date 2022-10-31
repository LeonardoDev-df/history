import { Transition, animated } from '@react-spring/web'

import { useRouter } from 'next/router'

import { Container, ContentWrapper, VrGirl } from './styles'
import { AppProvider } from '../../../contexts'

export function AuthLayout({ children }) {
    const route = useRouter()

    return (
        <AppProvider>
            <Container>
                <div>
                    <VrGirl />

                    <Transition
                        items={route}
                        from={{
                            opacity: 0,
                            transform: 'translate3d(25%,0,0)'
                        }}
                        enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
                        leave={{
                            opacity: 0,
                            transform: 'translate3d(-25%,0,0)',
                            position: 'absolute',
                            display: 'none'
                        }}
                    >
                        {styles => (
                            <animated.div
                                style={{
                                    ...styles,
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                {children}
                            </animated.div>
                        )}
                    </Transition>
                </div>
            </Container>
        </AppProvider>
    )
}
