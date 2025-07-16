import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_CONFERENCE_SERVICE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});