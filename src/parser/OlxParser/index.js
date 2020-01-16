import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async getPagesCount(param) {
    const arr = await this.parseHTML(param);
    // console.log(+arr[arr.length - 1].childNodes[0].rawText);
    return +arr[arr.length - 1].childNodes[0].rawText;
  }

  async extractData(param) {
    // const lng = await this.getPagesCount(param);
    const itemsArr = [];
    for (let i = 1; i <= 2; i += 1) {
      const data = this.parseHTML(`${this.URL}?page=${i}`);
      itemsArr.push(data);
    }
    this.itemsArr = await Promise.all(itemsArr);
    console.log(this.itemsArr);
  }
}
