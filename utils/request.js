import fetch from 'fetch-ponyfill';

export const get = url => fetch(url);

export const post = (url, postData) => (
  fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
);
