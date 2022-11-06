import { useState } from 'react'

import {
    Container,
    Main,
    Navbar,
    Logo,
    FixedContent,
    One,
    Two,
    Three
} from './styles'
import { AppProvider } from '../../../contexts'
import Link from '../../../infra/components/Link'
import { Sidebar } from '../../Sidebar'

export const SidebarLayout: React.FC<{ changeTheme(): void }> = ({
    children,
    changeTheme
}) => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (

        <AppProvider>
            <Container>
                <FixedContent>
                    <Navbar showSidebar={showSidebar}>
                        <button onClick={() => setShowSidebar(prev => !prev)}>
                            <One showSidebar={showSidebar} />
                            <Two showSidebar={showSidebar} />
                            <Three showSidebar={showSidebar} />
                        </button>
                        <Link href="/">
                            <Logo />
                        </Link>
                    </Navbar>
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
