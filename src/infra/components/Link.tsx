import { ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkProps {
    href: string;
    children: ReactNode;
}

export default function Link({href, children}: LinkProps) {
    return(
        <NextLink href={href} passHref>
            <a>
                {children}
            </a>
        </NextLink>
    );
}
