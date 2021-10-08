import { findHotelNearbyWithBestOffer, findHotelsNearby} from '../../../../../src/core/helpers/hotels'

describe('App', () => {
    test('findHotelsNearby() returns an empty array when no args are passed', () => {
        expect(findHotelsNearby().length).toBe(0);
    });
    test('when user is at the center of Paris, some hotels are found', () => {
        expect(findHotelsNearby({lat: 48.856564, lon: 2.351711}, 2000).length).toBeGreaterThan(0);
    });
    test('findHotelNearbyWithBestOffer() returns null when no args are passed', () => {
        expect(findHotelNearbyWithBestOffer()).toBeNull();
    });
    test('when user is at the center of Paris, and looks for the cheapest offer in hotels around for the date 11/01/2021, an hotel is found', () => {
        // Commenting this because this is assuming there's always going to be an hotel nearby these coords, and this is unpredictable
        expect(findHotelNearbyWithBestOffer({lat: 48.856564, lon: 2.351711}, 2000, '11/01/2021')!.ridCode).toBeDefined();
    });
});
