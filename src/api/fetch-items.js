/* global fetch */
/* eslint no-param-reassign: [2, { "props": false }] */
/* eslint-disable no-console */

import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import { handleErrors } from '../lib/utils';

const BOOKMARK_COUNT_URI = 'http://api.b.st-hatena.com/entry.count?url=';

export default function fetchItems(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then(handleErrors)
      .then(response => response.json())
      .then((items) => {
        // はてなブックマーク数情報を追加
        items.forEach((item, index, array) => {
          fetchJsonp(BOOKMARK_COUNT_URI + encodeURIComponent(item.url))
            .then(response => response.json())
            .then((jsonp) => {
              item.bookmark_count = jsonp;
              if (index === array.length - 1) {
                resolve(items);
              }
            });
        });
      })
      .catch((ex) => {
        console.log('parsing failed', ex);
      });
  });
}
