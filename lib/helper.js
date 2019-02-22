import { PAGES_COUNT, PAGE_BUFFER } from './constants';

export async function fetchData(url) {
  const res = await fetch(url);

  return await res.json();
}

export function getPageNosToDisplay(pageNos, count, page) {
  if (count <= PAGES_COUNT) {
    return pageNos;
  }
  else {
    const left = (page - PAGE_BUFFER) > PAGE_BUFFER;
    const right = (count - page) > PAGE_BUFFER + 1;

    if (left && right) {
      return [
        pageNos[0],
        '...',
        ...pageNos.slice(page - PAGE_BUFFER - 1, page + PAGE_BUFFER),
        '...',
        pageNos[pageNos.length - 1]
      ];
    }
    else {
      if (right) {
        return [
          ...pageNos.slice(0, PAGES_COUNT - PAGE_BUFFER),
          '...',
          pageNos[pageNos.length - 1]
        ];
      }
      if (left) {
        return [
          pageNos[0],
          '...',
          ...pageNos.slice(pageNos.length - (PAGES_COUNT - PAGE_BUFFER), pageNos.length)
        ];
      }
    }
  }
}