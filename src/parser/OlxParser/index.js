import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async getPagesCount() {
    const arr = await this.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');
    // console.log(+arr[arr.length - 1].childNodes[0].rawText);
    return +arr[arr.length - 1].childNodes[0].rawText;
  }

  async parseMainPages(param) {
    const lng = await this.getPagesCount();
    const items = [];
    for (let i = 1; i <= lng; i += 1) {
      const data = this.parseHTML(param, `${this.URL}?page=${i}`);
      items.push(data);
    }
    // await Promise.all(items);
    const fetchedItems = await Promise.all(items);
    return fetchedItems.flat();
  }

  async extractData(param) {
    const parsedPages = await this.parseMainPages(param);
    parsedPages.forEach((elm) => {
      this.elmArr.push({
        name: elm.childNodes[0].rawText,
        href: elm.parentNode.rawAttrs.match(/(?<=href=")(.*)(?=")/g)[0],
        view: 0,
      });
    });
  }

  async as(param) {
    await this.extractData(param);
    this.elmArr.forEach((elm) => {
      const data = this.parseHTML('#offerbottombar.pdingtop10 strong', elm.href);
      console.log(data);
    });
  }
}
