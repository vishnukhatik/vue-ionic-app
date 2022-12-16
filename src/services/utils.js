import EnsurePlace from '@/gql/general/EnsurePlace.gql';
import $apollo from './apollo';

function calculateDistance(lat1, lon1, lat2, lon2) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1.609344;
  return dist;
}

async function savePlace(place, placeId) {
  const standardPlace = {};
  standardPlace.id = placeId;
  standardPlace.latitude = place.geometry.location.lat();
  standardPlace.longitude = place.geometry.location.lng();
  standardPlace.name = place.formatted_address;
  place.address_components.forEach((component) => {
    if (component.types.includes('neighborhood')) {
      standardPlace.neighborhood = component.long_name;
    }
    if (component.types.includes('postal_town')) {
      standardPlace.city = component.long_name;
    }
    if (component.types.includes('locality')) {
      standardPlace.city = component.long_name;
    }
    if (component.types.includes('administrative_area_level_2')) {
      standardPlace.county = component.long_name;
    }
    if (component.types.includes('administrative_area_level_1')) {
      standardPlace.state = component.long_name;
    }
    if (component.types.includes('country')) {
      standardPlace.country = component.long_name;
    }
    if (component.types.includes('postal_code')) {
      standardPlace.postal_code = component.postal_code;
    }
  });

  await $apollo.mutate({
    mutation: EnsurePlace,
    variables: standardPlace,
  });
  console.log('Saved');
}

export default {
  calculateDistance,
  savePlace,
};
