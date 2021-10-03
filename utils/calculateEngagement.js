export const calculateEngagement = (likes, comments, follower) =>
  Math.round(((likes + comments) / follower) * 100 * 1e2) / 1e2;
