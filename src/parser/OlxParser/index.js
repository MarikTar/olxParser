import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async step(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getPagesCount() {
    const arr = await this.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');
    return +arr[arr.length - 1].childNodes[0].rawText;
  }

  async compresDataPage(i, param) {
    const data = await this.parseHTML(param, `${this.URL}?page=${i}`);
    const tempArr = [];
    data.forEach((elm) => {
      tempArr.push({
        name: elm.childNodes[0].rawText,
        href: elm.parentNode.rawAttrs.match(/(?<=href=")(.*)(?=")/g)[0],
        view: 0,
      });
    });

    const viewPromises = [];
    tempArr.forEach((elm) => {
      viewPromises.push(this.parseHTML('.pdingtop10 strong', elm.href));
    });
    const res = await Promise.all(viewPromises);
    const views = res.flat();

    tempArr.forEach((elm, j) => {
      tempArr[j].view = +views[j].childNodes[0].rawText;
    });
    this.elmArr.push(...tempArr);
  }

  async parseMainPages(num = 1, lng = 0, param) {
    let i = num;
    await this.compresDataPage(i, param);
    await this.step(4000);
    i += 1;
    if (i <= lng) {
      return this.parseMainPages(i, lng, param);
    }
    return new Promise((resolve) => resolve());
  }

  async extractData(param) {
    const lng = await this.getPagesCount();
    await this.parseMainPages(1, lng, param);
  }

  async sortLargerToSmaller(param) {
    await this.extractData(param);
    this.elmArr.sort((a, b) => b.view - a.view);
  }

  async sortSmallerToLarger(param) {
    await this.extractData(param);
    this.elmArr.sort((a, b) => a.view - b.view);
  }
}
