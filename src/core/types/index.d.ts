// HOTELS
export type Hotel = {
    ridCode: string
    countryCode: string
    localRating: number
    longitude: number
    brandCode: string
    zoomLevel: number
    streetViewInfo: string
    address: string
    latitude: number
    commercialName: string
}

export type HotelList = Array<Hotel>
export type HotelServiceReturnType = {
    hotels: HotelList
}

// PRICES
export type PriceOffer = {
    date: string
    fare: 'STANDARD' | 'SPECIAL_OFFER'
    price: number
}

export type Price = {
    ridCode: string
    offers: Array<PriceOffer>
}

export type PriceList = Array<Price>
export type PriceServiceReturnType = {
    prices: PriceList
}

// USERS
export type UserAddressGeo = {
    lat: string
    lng: string
}

export type UserAddress = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: UserAddressGeo
}

export type UserCompany = {
    name: string
    catchPhrase: string
    bs: string
}

export type User = {
    id: number
    name: string
    username: string
    email: string
    address: UserAddress
    phone: string
    website: string
    company: UserCompany
}

export type UserList = Array<User>
export type UserServiceReturnType = {
    users: UserList
}

// DISTANCE HELPER
export type CoordinatesSet = {
    lat: number
    lon: number
}

// API RETURN TYPES
export type HotelApiReturnType = {
    ridCode: string
    countryCode: string
    localRating: number
    address: string
    commercialName: string
}

export interface HotelWithDistanceApiReturnType extends HotelApiReturnType {
    distance: number
}
export interface HotelWithOfferApiReturnType extends HotelApiReturnType {
    distance: number
    offer: PriceOffer
}