import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import 'whatwg-fetch';

const BOOKMARK_COUNT_URI = 'https://b.hatena.ne.jp/entry.count?url=';

export function fetchItems(uri) {
  return new Promise((resolve, reject) => {

    fetch(uri)
      .then((response) => response.json())
      .then((items) => {

        // はてなブックマーク数情報を追加
        items.forEach((item, index, array) => {
          fetch(`../../mock/bookmark_count${['0','1','5'].sort(()=> Math.random()-.5)[0]}.json`)
          // fetchJsonp(BOOKMARK_COUNT_URI + encodeURIComponent(item.url))
            .then((response) => response.json())
            .then((jsonp) => {
              item.bookmark_count = jsonp;
              console.log(jsonp);
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
