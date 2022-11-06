import { useCallback, useState } from 'react'
import { useMap } from 'react-leaflet'

import {
    Container,
    SearchInputWrapper,
    SearchResWrapper,
    SectionDivider,
    ResClose
} from './styles'
import StaticSiteImage from '../../assets/site-image.jpg'
import { isArrayEmpty, isObjectEmpty } from '../../utils/isItEmpty'
import { SearchMapRes } from '../SearchMapRes'
import { SearchInput } from '../SearchInput'
import { StaticImageData } from '../../shared/model/user.model'

type DataItem = {
    id: string | number
    position: [number, number]
    popupMessage: string
    image: StaticImageData
    title: string
    address: string
}

interface SearchMapSideProps {
    data: DataItem[]
}

export function SearchMapSide({ data }: SearchMapSideProps) {
    const [searchData, setSearchData] = useState([])
    const [showRes, setShowRes] = useState(false)
    const map = useMap()

    const handleButtonClick = useCallback((value: string) => {
        if (value) {
            const filteredArray = data.filter(
                item =>
                    item.title.substr(0, value.length).toLowerCase() ===
                    value.toLowerCase()
            )

            setSearchData(filteredArray)
            setShowRes(true)
        } else {
            // setSearchData([])
        }
    }, [])

    const handleMapResClick = useCallback((e, item: DataItem) => {
        map.setView(item.position, 15)
    }, [])

    return (
        <Container isEmpty={!showRes}>
            <SearchInputWrapper>
                <SearchInput
                    onButtonClick={handleButtonClick}
                    placeholder="Pesquise por nome ou endereço"
                />
            </SearchInputWrapper>

            {showRes && (
                <div>
                    <SectionDivider />
                    <SearchResWrapper>
                        <h3>Resultados encontrados</h3>
                        {searchData.map(item => (
                            <SearchMapRes
                                key={item.id}
                                data={item}
                                onCustomClick={handleMapResClick}
                            />
                        ))}
                        {isArrayEmpty(searchData) && (
                            <h3>Nenhum resultado encontrado</h3>
                        )}
                    </SearchResWrapper>
                    <ResClose onClick={() => setShowRes(false)}>
                        Fechar
                    </ResClose>
                </div>
            )}
        </Container>
    )
}
