import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.div`
    background: black;
    color: white;
    border-radius: .8rem;
    /* overflow: hidden; */

    width: 10rem;

    img {
        width: 100%;
        height: 100%;
        border-radius: .8rem .8rem 0 0;
    }
`
export const BottomPart = styled.div`
    position: relative;
    text-align: center;
    padding: .4rem;
    background: var(--primary);
    font-weight: 600;
    margin-top: -5px;
    border-radius: 0 0 .8rem .8rem;

    &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-style: solid;
        border-color: var(--primary) transparent;
        border-width: 10px 10px 0 10px;
    }
`

export const StImage = styled(Image)`
    object-fit: cover;
`
