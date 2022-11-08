import { useCallback, useState } from 'react'
import axios from 'axios'
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
import {
    MapHistoricalSite,
    StaticImageData
} from '../../shared/model/site.model'
import { Loading } from '../Loading'

interface SearchMapSideProps {
    data: MapHistoricalSite[]
}

export function SearchMapSide({ data }: SearchMapSideProps) {
    const [searchData, setSearchData] = useState([] as MapHistoricalSite[])
    const [showRes, setShowRes] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const map = useMap()

    const handleButtonClick = useCallback(async (value: string) => {
        if (value) {
            const filteredArray = data.filter(
                item =>
                    item.name.substr(0, value.length).toLowerCase() ===
                    value.toLowerCase()
            )

            try {
                setIsLoading(true)
                setShowRes(true)
                const response = await axios.get(
                    `/api/historical-sites/map/filter?s=${value}`
                )

                if (response && response.data) {
                    console.log(response.data)
                    const handledResponse = response.data.map(item => ({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        image: item.siteImageMapDTOS[0].imagePreview,
                        position: [
                            Number(item.latitude),
                            Number(item.longitude)
                        ],
                        address: {
                            streetAddress: item.streetAddress,
                            city: item.city,
                            uf: item.uf,
                            zipCode: item.zipCode
                        }
                    }))

                    setSearchData(handledResponse)
                }
            } catch (error) {
                // Handle error
            } finally {
                setIsLoading(false)
            }
        } else {
            // setSearchData([])
        }
    }, [])

    const handleMapResClick = useCallback((e, item: MapHistoricalSite) => {
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
                    <Loading isVisible={isLoading} type="no-overlay" />
                </div>
            )}
        </Container>
    )
}
