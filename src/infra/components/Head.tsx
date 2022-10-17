import NextHead from 'next/head';

interface HeadProps {
    title: string;
}

export default function Head({ title }: HeadProps) {
    return(
        <NextHead>
            <title>
                {title}
            </title>
        </NextHead>
    );
}
