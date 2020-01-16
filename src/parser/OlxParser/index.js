import HTMLParser from '../HTMLParser';

export default class OlxParser extends HTMLParser {
  async getPagesCount(param) {
    const arr = await this.parseHTML(param);
    console.log(+arr[arr.length - 1].childNodes[0].rawText);
    return +arr[arr.length - 1].childNodes[0].rawText;
  }
}
