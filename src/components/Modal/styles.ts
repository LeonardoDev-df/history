import styled, { css } from 'styled-components'

import { Download, Share } from '../../styles/Icons'

interface ModalProps {
    isVisible: boolean
}

export const Container = styled.div<ModalProps>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 0 2.4rem;

    display: none;
    /* transform: translateY(-50%); */

    ${props => props.isVisible && css`
        display: block;
        /* transform: translateY(0%); */
    `}
`
