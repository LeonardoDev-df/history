export interface StaticImageData {
    src: string
    height: number
    width: number
    blurDataURL?: string
}

export interface SiteProps {
    id: string | number
    position: [number, number]
    description: string
    image: StaticImageData
    title: string
    address: string
}

export type SiteImageType = {
    id?: number
    image3D: string
    imagePreview: string
    numberImage: number
    year: Date
}

export type SiteStatus = 'EM_ANALISE' | 'ACEITO' | 'NEGADO'

export interface HistoricalSiteProps {
    id?: number
    idUser?: number
    address: {
        id?: number
        city: string
        complement: string
        latitude: string
        longitude: string
        number: string
        province: string
        status: boolean
        streetAddress: string
        uf: string
        zipCode: string
    }
    siteImages: SiteImageType[]
    comment: string
    description: string
    like: number
    name: string
    status: SiteStatus
}

export interface SiteImage3DView {
    numberImage: number
    buttonColor: string
    buttonPosition: [number, number, number]
    image3D: string
    imagePreview: string
    // year: number
}
export interface Site3DViewHUD {
    id: number
    name: string
    description: string
    years: number[]
    like: number
    preview_images: {
        image: string
        link: number
    }[]
    address?: {
        streetAddress: string,
        city: string,
        uf: string,
        zipCode: string
    }
}

export type MapHistoricalSite = {
    id: number
    name: string
    description: string
    position: [number, number]
    image: string
    address?: {
        streetAddress: string,
        city: string,
        uf: string,
        zipCode: string
    }
}
