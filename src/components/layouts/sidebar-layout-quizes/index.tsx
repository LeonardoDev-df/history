import { useState } from 'react'

import {
    Container,
    Main,
    Navbar,
    Header,
    Logo,
    FixedContent,
    One,
    Two,
    Three
} from './styles'
import { AppProvider } from '../../../contexts'
import Link from '../../../infra/components/Link'
import { Sidebar } from '../../SidebarQuiz'

export const SidebarLayout: React.FC<{ changeTheme(): void }> = ({
    children,
    changeTheme
}) => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (

        <AppProvider>
            <Container>
                <FixedContent>
                <Header $on={showSidebar}>
                <div>
                    {/* <AssetLogo /> */}
                    <Link href="/">
                        <Logo />
                    </Link>

                    <button onClick={() => setShowSidebar(prev => !prev)}>
                        
                    </button>

                    <nav>
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>

                            <li>
                                <Link href="/search-map">Explorar</Link>
                            </li>
                            <Link href="/signIn">
                                <button>Entrar</button>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </Header>
                    <Sidebar
                        changeTheme={changeTheme}
                        showSidebar={showSidebar}
                    />
                </FixedContent>
                <Main showSidebar={showSidebar}>{children}</Main>
            </Container>
        </AppProvider>

    )
}
