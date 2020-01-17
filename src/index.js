// import HTMLParser from './parser/HTMLParser';
import OlxParser from './parser/OlxParser';

const URL = 'https://www.olx.ua/otdam-darom/pol/';
const PARAM = 'a.block.br3.brc8.large.tdnone.lheight24 span';
// const htmlParser = new HTMLParser('https://www.olx.ua/transport/legkovye-avtomobili/pol/');
// htmlParser.parseHTML('a.marginright5.link.linkWithHash.detailsLink strong');
// htmlParser.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');


const olxParser = new OlxParser(URL);
olxParser.extractData(PARAM);
