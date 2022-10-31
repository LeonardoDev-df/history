export interface IUser {
    id?: any;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    authorities?: any[];
    createdBy?: string;
    createdDate?: Date | null;
    lastModifiedBy?: string;
    lastModifiedDate?: Date | null;
    password?: string;
}

export const defaultValue: Readonly<IUser> = {
    id: '',
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    activated: true,
    langKey: 'pt-Br',
    authorities: [],
    createdBy: '',
    createdDate: null,
    lastModifiedBy: '',
    lastModifiedDate: null
};

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
