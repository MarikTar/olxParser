import OlxParser from './OlxParser';

const olxParser = new OlxParser('https://www.olx.ua/transport/legkovye-avtomobili/pol/');
olxParser.parseHTML('a.marginright5.link.linkWithHash.detailsLink');
