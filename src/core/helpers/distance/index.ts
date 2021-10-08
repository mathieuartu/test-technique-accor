import { CoordinatesSet } from '../../types'

export const getDistanceInMetersBetweenCoordinates = (coordinatesSet1: CoordinatesSet, coordinatesSet2: CoordinatesSet): number => {
	const { lat: lat1, lon: lon1 } = coordinatesSet1
	const { lat: lat2, lon: lon2 } = coordinatesSet2
	
	const R = 6371e3 // metres
	const φ1 = lat1 * Math.PI/180 // φ, λ in radians
	const φ2 = lat2 * Math.PI/180
	const Δφ = (lat2-lat1) * Math.PI/180
	const Δλ = (lon2-lon1) * Math.PI/180

	const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			  Math.cos(φ1) * Math.cos(φ2) *
			  Math.sin(Δλ/2) * Math.sin(Δλ/2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

	const d = R * c // in metres
	
	return d
}

export const convertMetersInKilometers = (meters:number) => {
	return `${Math.floor(meters) / 1000}`.substr(0,3)
}