import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async getPagesCount() {
    const arr = await this.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');
    // console.log(+arr[arr.length - 1].childNodes[0].rawText);
    return +arr[arr.length - 1].childNodes[0].rawText;
  }

  async extractData(param) {
    // const lng = await this.getPagesCount();
    const itemsArr = [];
    for (let i = 1; i <= 2; i += 1) {
      const data = this.parseHTML(param, `${this.URL}?page=${i}`);
      itemsArr.push(data);
    }
    this.itemsArr = await Promise.all(itemsArr);
    console.log(this.itemsArr);
  }
}
