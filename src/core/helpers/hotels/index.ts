import { HotelsService } from '../../services'
import { getDistanceInMetersBetweenCoordinates } from '../../helpers/distance'
import { HotelWithDistanceApiReturnType, CoordinatesSet, HotelWithOfferApiReturnType } from '../../types'

export const findHotelsNearby = (coords?: CoordinatesSet, radius?: number) => {
    if (!coords || !radius) return []

    const allHotels = HotelsService.getHotels()
    
    const allHotelsWithDistanceInformationFromCoordinates = allHotels.map(hotel => {
        const { ridCode, address, localRating, countryCode, commercialName, latitude, longitude } = hotel

        const distance = getDistanceInMetersBetweenCoordinates({ lat: coords.lat, lon: coords.lon }, { lat: latitude, lon: longitude})

        return {
            ridCode,
            address,
            localRating,
            countryCode,
            commercialName,
            distance,
        } as HotelWithDistanceApiReturnType
    }) 
    
    const hotelsWithinRadius = allHotelsWithDistanceInformationFromCoordinates.filter(hotel => hotel.distance < radius)
    return hotelsWithinRadius;
}

export const findHotelNearbyWithBestOffer = (coords?: CoordinatesSet, radius?: number, date?: string) => {
    if (!coords || !radius || !date) return null

    const nearbyHotels = findHotelsNearby(coords, radius)
    if (!nearbyHotels.length) return null

    const nearbyHotelsForThisDateWithStandardPrices = nearbyHotels.map(hotel => {
        return {
            ...hotel,
            offer: HotelsService.getHotelStandardOfferForSpecificDate(hotel.ridCode, date),
        } as HotelWithOfferApiReturnType
    }).filter(hotel => !!hotel.offer)

    if (!nearbyHotelsForThisDateWithStandardPrices.length) return null

    const nearestHotelsSortedByBestOffer = nearbyHotelsForThisDateWithStandardPrices.sort((a, b) => a.offer.price - b.offer.price)

    if (nearestHotelsSortedByBestOffer.length > 1) {
        const [hotel1, hotel2] = nearestHotelsSortedByBestOffer
        const nearestOfTheTwoBestOffers = [hotel1, hotel2].sort((a, b) => a.distance - b.distance)[0]
        return nearestOfTheTwoBestOffers
    } else {
        return nearestHotelsSortedByBestOffer[0]
    }
}