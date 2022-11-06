import { useState, useCallback, useContext, useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import { useRouter } from 'next/router'
import { ThemeContext } from 'styled-components'
import { shade, lighten } from 'polished'
import Switch from 'react-switch'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'

import { AuthContext } from '../../contexts/auth'
import {
    Container,
    StUser,
    StUpload,
    StVr,
    StAdmin,
    StUsers,
    StLogOut,
    StDashboard,
    Item,
    Divider
} from './styles'
import { Loading } from '../Loading'

type SidebarProps = {
    changeTheme(): void
    showSidebar: boolean
}

const userTabs = [
    {
        id: 1,
        icon: StDashboard,
        title: 'Quizzes',
        urlPath: 'Quizzes',
        isActive: false
    },
    {
        id: 8,
        icon: StDashboard,
        title: 'Ranking',
        urlPath: 'Ranking',
        isActive: false
    },
    {
        id: 9,
        icon: StDashboard,
        title: 'Emblemas',
        urlPath: 'emblemsQuiz',
        isActive: false
    }
]

const adminTabs = [

    ...userTabs,

]

export const Sidebar = ({ changeTheme, showSidebar }: SidebarProps) => {
    const logOut = useContextSelector(AuthContext, c => c.logOut)
    const user = useContextSelector(AuthContext, c => c.account)
    const isLoading = useContextSelector(AuthContext, c => c.isLoading)
    const getSetUserData = useContextSelector(
        AuthContext,
        c => c.getSetUserData
    )
    const { colors, title } = useContext(ThemeContext)

    const router = useRouter()

    const [items, setItems] = useState(() => {
        const splitedPathname = router.asPath.split('/')
        const activePath = splitedPathname[splitedPathname.length - 1]
        let handleTabChoice = userTabs

        const handledItems = handleTabChoice.map(item => ({
            ...item,
            isActive:
                item.urlPath.split('/').pop() !== activePath ? false : true
        }))

        return handledItems
    })

    const handleActiveItemChange = useCallback(
        (id: number, urlPath: string) => {
            router.push(`/control-panel/${router.query.username}/${urlPath}`)
            setItems(oldItems => {
                const resetedItems = oldItems.map(item => ({
                    ...item,
                    isActive: item.id === id ? true : false
                }))

                return resetedItems
            })
        },
        []
    )

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            getSetUserData()
        }
    }, [])

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            const splitedPathname = router.asPath.split('/')
            const activePath = splitedPathname[splitedPathname.length - 1]
            let handleTabChoice = userTabs

            handleTabChoice = user.authorities.includes('ROLE_ADMIN')
                ? adminTabs
                : userTabs

            const handledItems = handleTabChoice.map(item => ({
                ...item,
                isActive:
                    item.urlPath.split('/').pop() !== activePath ? false : true
            }))
            setItems(handledItems)
        }
    }, [user])

    return (
        <Container showSidebar={showSidebar}>
            {items.map(({ id, title, icon: Icon, isActive, urlPath}) => (
                <Item
                    key={id}
                    active={isActive}
                    onClick={() => handleActiveItemChange(id, urlPath)}
                >
                    <Icon />
                    <span>{title}</span>
                </Item>
                
            ))}

            <Loading isVisible={isLoading} type="no-overlay" />

            <Divider />

            <label
                htmlFor="theme-switch"
                style={{
                    display: 'block',
                    marginTop: '1rem',
                    marginBottom: '1rem'
                }}
            >
                <Item>
                    <Switch
                        id="theme-switch"
                        onChange={changeTheme}
                        checked={title === 'dark'}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={16}
                        width={32}
                        handleDiameter={20}
                        offColor={shade(0.15, colors.sidebar)}
                        onColor={shade(0.15, colors.red)}
                        offHandleColor="#f5f5f5"
                        onHandleColor={lighten(0.2, colors.red)}
                        boxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        activeBoxShadow="0px 0px 1px 4px rgba(0, 0, 0, 0.2)"
                    />
                    <span
                        style={{
                            marginLeft: '1.6rem'
                        }}
                    >
                        Tema escuro
                    </span>
                </Item>
            </label>


        </Container>
    )
}
