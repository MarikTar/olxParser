import { parse } from 'node-html-parser';
import fetch from 'node-fetch';

export default class OlxParser {
  constructor(url) {
    this.URL = url || '';
  }

  async getHTML(url = this.URL) {
    if (!url) {
      return '';
    }
    const data = await fetch(url);
    const result = await data.text();
    return result;
  }

  async parseHTML(param = 'body') {
    const HTMLText = await this.getHTML(this.URL);
    const HTMLElement = parse(HTMLText, {
      lowerCaseTagName: false,
      script: false,
      style: false,
      pre: false,
      comment: false,
    });
    console.log(HTMLElement.querySelectorAll(param));
    return HTMLElement.querySelectorAll(param);
  }
}
