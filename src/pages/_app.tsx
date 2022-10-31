import { useCallback } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { NextComponentType, NextPageContext } from 'next'

import usePersistedState from '../hooks/use-persisted-state'
import { DefaultLayout } from '../components/layouts/default'
import GlobalStyle from '../styles/global'
import light from '../styles/themes/light'
import { AppProvider } from '../contexts'
import dark from '../styles/themes/dark'

interface MyAppProps extends AppProps {
    Component: NextComponentType<NextPageContext, any, {}> & {
        Layout: new ({ changeTheme }: { changeTheme(): void }) => JSX.Element
    }
}

function MyApp({ Component, pageProps }: MyAppProps) {
    // const [theme, setTheme] = useState(light)

    const [theme, setTheme] = usePersistedState<DefaultTheme>(
        'rvh-theme',
        light
    )

    // Repassar essa função para o componente que muda o tema
    const toggleTheme = useCallback(() => {
        setTheme(oldVal => (oldVal.title === 'light' ? dark : light))
    }, [])

    const Layout = Component.Layout || DefaultLayout

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Layout changeTheme={toggleTheme}>
                <Component {...pageProps} />
            </Layout>
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default MyApp
