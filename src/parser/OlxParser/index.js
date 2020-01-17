import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async getPagesCount() {
    const arr = await this.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');
    // console.log(+arr[arr.length - 1].childNodes[0].rawText);
    return +arr[arr.length - 1].childNodes[0].rawText;
  }

  async extractData(param) {
    const lng = await this.getPagesCount();
    const items = [];
    for (let i = 1; i <= lng; i += 1) {
      const data = this.parseHTML(param, `${this.URL}?page=${i}`);
      items.push(data);
    }
    let fetchedItems = await Promise.all(items);
    fetchedItems = fetchedItems.flat();
    const itemsAttrs = [];
    fetchedItems.forEach((elem) => {
      itemsAttrs.push({
        name: elem.childNodes[0].rawText,
        href: elem.parentNode.rawAttrs.match(/(?<=href=")(.*)(?=")/g)[0],
        view: 0,
      });
    });
    console.log(itemsAttrs);
  }
}
