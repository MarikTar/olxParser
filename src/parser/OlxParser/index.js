import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async getPagesCount() {
    const arr = await this.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');
    // console.log(+arr[arr.length - 1].childNodes[0].rawText);
    return +arr[arr.length - 1].childNodes[0].rawText;
  }

  async parseMainPages(param) {
    const lng = await this.getPagesCount();
    const itemPromises = [];
    for (let i = 1; i <= 1; i += 1) {
      const data = this.parseHTML(param, `${this.URL}?page=${i}`);
      itemPromises.push(data);
    }
    // await Promise.all(itemPromises);
    const res = await Promise.all(itemPromises);
    return res.flat();
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

  async parseView(param) {
    await this.extractData(param);
    const viewPromises = [];
    this.elmArr.forEach((elm) => {
      const data = this.parseHTML('.pdingtop10 strong', elm.href);
      viewPromises.push(data);
    });
    const res = await Promise.all(viewPromises);
    const views = res.flat();

    this.elmArr.forEach((elma, i) => {
      this.elmArr[i].view = +views[i].childNodes[0].rawText;
    });
  }

  async sortLargerToSmaller(param) {
    await this.parseView(param);
    this.elmArr.sort((a, b) => b.view - a.view);
    console.log(this.elmArr);
  }

  async sortSmallerToLarger(param) {
    await this.parseView(param);
    this.elmArr.sort((a, b) => a.view - b.view);
    console.log(this.elmArr);
  }
}
