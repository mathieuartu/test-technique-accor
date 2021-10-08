import { getDistanceInMetersBetweenCoordinates } from '../../../../../src/core/helpers/distance'

describe('Helper', () => {
  test('distance() returns the distance in meters betwween 2 geolocations', () => {
    expect(Math.round(getDistanceInMetersBetweenCoordinates({lat: 48.864667, lon: 2.326062}, {lat: 48.849306, lon: 2.349752}))).toBe(2433);
  });
  test('distance is 0 when geolocations are the same', () => {
    expect(getDistanceInMetersBetweenCoordinates({lat: 48.864667, lon: 2.326062}, {lat: 48.864667, lon: 2.326062})).toBe(0);
  });
});