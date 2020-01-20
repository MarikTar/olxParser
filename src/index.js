// import HTMLParser from './parser/HTMLParser';
import express from 'express';
// import fetch from 'node-fetch';
import cors from 'cors';
import OlxParser from './parser/OlxParser';
// import OlxParser from '../dist/OlxParser';

// const URL = 'https://www.olx.ua/uk/rabota/meditsina-farmatsiya/pol/';
const olxParser = new OlxParser();
const PARAM = 'a.marginright5.link.linkWithHash.detailsLink strong';
// const htmlParser = new HTMLParser('https://www.olx.ua/transport/legkovye-avtomobili/pol/');
// htmlParser.parseHTML('a.marginright5.link.linkWithHash.detailsLink strong');
// htmlParser.parseHTML('a.block.br3.brc8.large.tdnone.lheight24 span');

const PORT = process.env.PORT || 80;
const app = express();
app.use(cors({
  optionsSuccessStatus: 200,
  credentials: false,
}));

app.get('/', async (req, res) => {
  const { href } = req.query;
  if (href) {
    olxParser.URL = href;
    const body = await olxParser.sortSmallerToLarger(PARAM);
    return res.status(200).send({ success: true, body });
  }
  return res.status(404).send({ success: false, body: '' });
});

app.listen(PORT, () => console.log('server is running...'));
