import TrackEvent from '@/gql/general/TrackEvent.gql';
import $apollo from './apollo';
import $auth from './auth';

async function trackEvent(action, itemId) {
  const userId = $auth.getUserId();
  const location = await $auth.getLocation();
  const variables = {
    action,
    item_id: itemId,
    user_id: userId,
    ip: location.ip,
    city: location.city,
    country: location.country_name,
  };
  await $apollo.mutate({
    mutation: TrackEvent,
    variables,
  });
}

export default {
  trackEvent,
};
