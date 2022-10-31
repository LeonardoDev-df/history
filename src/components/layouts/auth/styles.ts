import styled from 'styled-components'

import AssetVrGirl from '../../../assets/illustrations/vr-girl.svg'

export const Container = styled.div`
    background: #d1e8ff;
    height: 100vh;

    display: flex;
    /* justify-content: center;
    align-items: center; */

    overflow: hidden;

    & > div {
        margin: auto;
        position: relative;
        display: flex;

        border-radius: 1.6rem;

        width: min(1224px, 90%);
        height: min(624px, 90%);
        background: white;

        box-shadow: 0 0 12px 8px rgba(0, 0, 0, 0.05);

        background: ${props => props.theme.colors.primary};
    }

    @media screen and (max-width: 930px) {
        & > div {
            width: min(524px, 100%);
            height: auto;
        }
    }

    @media screen and (max-width: 541px) {
        & > div {
            width: min(524px, 90%);
        }
    }
`

export const VrGirl = styled(Object(AssetVrGirl))`
    width: 100%;
    margin: 2.4rem 0;
    /* height: auto; */

    @media screen and (max-width: 930px) {
        display: none;
    }
`

export const ContentWrapper = styled.div`
    width: 100%;
    height: auto;
    /* flex: 1; */
`
