import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

const BOOKMARK_COUNT_URI = 'https://b.hatena.ne.jp/entry.count?url=';

export function setBookmarkCountToItems(items) {
  items.forEach((item) => {
    fetch(`../../mock/bookmark_count${['0','1','5'].sort(()=> Math.random()-.5)[0]}.json`)
    // fetchJsonp(BOOKMARK_COUNT_URI + encodeURIComponent(item.url))
      .then((response) => response.json() )
      .then((jsonp) => {item.bookmark_count = jsonp} );
  });
  return items;
}
