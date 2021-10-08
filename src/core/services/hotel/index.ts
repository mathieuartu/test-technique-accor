import hotels from '../data/hotels'
import { PricesService } from '../../services'
import { Price, PriceOffer } from '../../types';


export const getHotels = () => {
	return hotels.hotels;
}

export const getHotelOffers = (hotelRidCode: string) => {
	if (!hotelRidCode) return []

	const allOffers = PricesService.getPrices()
	return allOffers.filter(offer => offer.ridCode === hotelRidCode)
}

export const getHotelStandardOffers = (hotelRidCode: string) => {
	if (!hotelRidCode) return []

	const hotelStandardOffers = getHotelOffers(hotelRidCode).map(offer => {
		return {
			...offer,
			offers: offer.offers.filter(o => o.fare === 'STANDARD')
		} as Price
	})
	return hotelStandardOffers
}

export const getHotelSpecialOffers = (hotelRidCode: string) => {
	if (!hotelRidCode) return []

	const hotelStandardOffers = getHotelOffers(hotelRidCode).map(offer => {
		return {
			...offer,
			offers: offer.offers.filter(o => o.fare === 'SPECIAL_OFFER')
		} as Price
	})
	return hotelStandardOffers
}

export const getHotelStandardOfferForSpecificDate = (hotelRidCode: string, date: string): PriceOffer | {} => {
	if (!hotelRidCode || !date) return {}

	const hotelStandardOfferForThisDate = getHotelStandardOffers(hotelRidCode)!.map(offer => {
		return {
			...offer,
			offers: offer.offers.filter(o => o.date === date)
		}
	})

	if (hotelStandardOfferForThisDate.length && hotelStandardOfferForThisDate[0].offers) {
		return hotelStandardOfferForThisDate[0].offers[0]
	} else {
		return {}
	}
}

export const getHotelFirstStandardOffer = (hotelRidCode: string): PriceOffer => {
	return getHotelStandardOffers(hotelRidCode)[0].offers[0]
}
export const getHotelFirstSpecialOffer = (hotelRidCode: string): PriceOffer => {
	return getHotelSpecialOffers(hotelRidCode)[0].offers[0]
}

export default {
	getHotels,
	getHotelOffers,
	getHotelStandardOffers,
	getHotelStandardOfferForSpecificDate,
	getHotelSpecialOffers,
	getHotelFirstStandardOffer,
	getHotelFirstSpecialOffer,
} 