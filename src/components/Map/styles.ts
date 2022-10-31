import styled from 'styled-components'
import { Popup } from 'react-leaflet'

export const StPopup = styled(Popup)`
    img {
        border-radius: 8px 8px 0 0;
        width: 100%;
    }

    > div:nth-child(1) {
        padding: 0;
        border-radius: 8px;
        width: 332px;

        div {
            margin: 0;
            width: 100% !important;
        }
    }
`

export const PopupBottom = styled.div`
    padding: .4rem 1.6rem 1.6rem;
    font-family: 'Roboto', sans-serif;

    p {
        margin: 0;
        font-size: 1.4rem;

        + p {
            margin-top: .4rem;
        }
    }
`
