import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http, { get } from 'k6/http';
import {sleep} from 'k6';

export let options = {
  vus: 10,
  duration: '30s'
};
const SLEEP_DURATION = 1;

export default function () {
  // reviews endpoint
  // const url = new URL('http://localhost:3000/reviews');
  // url.searchParams.append('product_id', (Math.floor(Math.random() * 1000000)).toString());

  // http.get(url.toString());
  // sleep(SLEEP_DURATION);

  // review/meta endpoint
  // const url = new URL('http://localhost:3000/reviews/meta');
  // url.searchParams.append('product_id', (Math.floor(Math.random() * 1000000)).toString());

  // http.get(url.toString());
  // sleep(SLEEP_DURATION);
}