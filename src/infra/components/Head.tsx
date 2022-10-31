import NextHead from 'next/head'

interface HeadProps {
    title: string
    children?: React.ReactNode
}

export default function Head({ title, children }: HeadProps) {
    return (
        <NextHead>
            <title>{title}</title>
            {children}
        </NextHead>
    )
}
