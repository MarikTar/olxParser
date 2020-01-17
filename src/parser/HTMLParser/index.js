import { parse } from 'node-html-parser';
import fetch from 'node-fetch';

export default class HTMLParser {
  constructor(url) {
    this.URL = url || '';
    this.elmArr = [];
  }

  async getHTML(url = this.URL) {
    if (!url) {
      return '';
    }
    const data = await fetch(url);
    const result = await data.text();
    return result;
  }

  async parseHTML(param = 'body', url = this.URL) {
    const HTMLText = await this.getHTML(url);
    const HTMLElement = parse(HTMLText, {
      lowerCaseTagName: false,
      script: false,
      style: false,
      pre: false,
      comment: false,
    });
    // console.log(HTMLElement.querySelectorAll(param));
    // this.elmArr = HTMLElement.querySelectorAll(param);
    return HTMLElement.querySelectorAll(param);
  }
}
