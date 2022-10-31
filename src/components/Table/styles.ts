import styled, { css } from 'styled-components'
import { shade, rgba } from 'polished'

import {
    ArrowIosBackOutline,
    ArrowIosForwardOutline,
    ArrowheadLeftOutline,
    ArrowheadRightOutline,
    ArrowUp,
    ArrowDown
} from '../../styles/Icons'

export const Container = styled.div`
    width: 100%;
`

export const TableWrapper = styled.div`
    width: 100%;
    overflow: auto;
`

export const StTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td, th {
        padding: 1.2rem;
        text-align: right;
    }

    th {
        padding-top: 1.6rem;
        padding-bottom: 1.6rem;
        color: ${props => props.theme.colors.title};
    }

    /* :nth-child() é uma pseudo classe css que seleciona um ou
        mais elementos entre um grupo elementos irmãos */
    /* -n+2 é a notação para representar os primeiros dois elementos */
    th:nth-child(-n+2), td:nth-child(-n+2) {
        /* background: #f2f2f2; */
        text-align: left;
    }

    tr {
        border-bottom: 1px solid ${props => rgba(props.theme.colors.text, 0.10)};
    }

    tbody  tr:hover {
        background: ${props => shade(0.08, props.theme.colors.paper)};
    }
`

export const PaginationBar = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1.6rem;

    button {
        margin: 0 .4rem;

        :disabled {
            opacity: .45;
            cursor: not-allowed;
        }
    }

    span {
        margin: 0 .8rem;
    }

    select {
        color: ${props => props.theme.colors.text};
    }
`

const IconCss = css`
    width: 2.4rem;
    height: 2.4rem;
`

export const StArrowLeft = styled(ArrowIosBackOutline)`
    ${IconCss}
`
export const StArrowRight = styled(ArrowIosForwardOutline)`
    ${IconCss}
`
export const StNormalArrowUp = styled(ArrowUp)`
    width: 1.6rem;
    height: 1.6rem;
    color: ${props => rgba(props.theme.colors.title, 0.45)};
    margin-right: .4rem;
`
export const StNormalArrowDown = styled(ArrowDown)`
    width: 1.6rem;
    height: 1.6rem;
    color: ${props => rgba(props.theme.colors.title, 0.45)};
    margin-right: .4rem;
`
export const StDoubleArrowLeft = styled(ArrowheadLeftOutline)`
    ${IconCss}
`
export const StDoubleArrowRight = styled(ArrowheadRightOutline)`
    ${IconCss}
`


