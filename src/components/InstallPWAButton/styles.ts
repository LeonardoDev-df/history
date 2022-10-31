import styled from 'styled-components'

import { Download } from '../../styles/Icons'

export const Container = styled.div`
    position: fixed;
    top: 30rem;
    right: 0;

    background: ${props => props.theme.colors.secondary};
    border-radius: 1.6rem 0 0 1.6rem;
    padding: .4rem .8rem;
    padding-right: 1.6rem;

    z-index: 1;
    cursor: pointer;
`

export const StDownload = styled(Download)`
    width: 3.2rem;
    height: 3.2rem;

    color: white;
`
