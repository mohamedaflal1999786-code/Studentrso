import https from 'https';
import http from 'http';
import { URL } from 'url';

const testUrls = [
  { name: 'Naan Mudhalvan (portal)', url: 'https://portal.naanmudhalvan.tn.gov.in/' },
  { name: 'Naan Mudhalvan (main)', url: 'https://naanmudhalvan.tn.gov.in/' },
  { name: 'Naan Mudhalvan (www)', url: 'https://www.naanmudhalvan.tn.gov.in/' },
  { name: 'ePathshala (nic)', url: 'https://epathshala.nic.in' },
  { name: 'ePathshala (gov)', url: 'https://epathshala.gov.in/' },
  { name: 'ePathshala (http)', url: 'http://epathshala.nic.in/' },
  { name: 'AICTE ELIS (aicte-india)', url: 'https://aicte-india.org' },
  { name: 'AICTE ELIS (elis portal)', url: 'https://elis.aicte-india.org/' },
  { name: 'AICTE ELIS (free portal)', url: 'http://free.aicte-india.org/' },
  { name: 'TNGASA (https non-www)', url: 'https://tngasa.in/' },
  { name: 'TNGASA (https www)', url: 'https://www.tngasa.in/' },
  { name: 'TNGASA (http)', url: 'http://www.tngasa.in/' },
  { name: 'TNAU (https)', url: 'https://tnau.ac.in/' },
  { name: 'TNAU (admissions)', url: 'https://tnau.ac.in/admissions/' },
  { name: 'TNAU (ucanapply)', url: 'https://tnau.ucanapply.com/' },
  { name: 'TANCET (annauniv)', url: 'https://tancet.annauniv.edu/' },
  { name: 'TANCET (tancet app)', url: 'https://tancet.annauniv.edu/tancet' },
  { name: 'CUET UG (nta)', url: 'https://exams.nta.ac.in/CUET-UG/' },
  { name: 'CUET UG (cuet.samarth)', url: 'https://cuet.samarth.ac.in/' },
  { name: 'CUET PG (nta)', url: 'https://exams.nta.ac.in/CUET-PG/' },
  { name: 'CSIR NET (nta)', url: 'https://csirnet.nta.ac.in/' },
  { name: 'CSIR NET (csirhrdg)', url: 'https://csirhrdg.res.in/' },
  { name: 'UGC NET (nta)', url: 'https://ugcnet.nta.ac.in/' },
  { name: 'UGC NET (nta.nic)', url: 'https://ugcnet.nta.nic.in/' },
  { name: 'IBPS (www)', url: 'https://www.ibps.in/' },
  { name: 'IBPS (non-www)', url: 'https://ibps.in/' },
  { name: 'TANGEDCO (gov.in)', url: 'https://www.tangedco.gov.in/' },
  { name: 'TANGEDCO (org)', url: 'https://www.tangedco.org/' },
  { name: 'TANGEDCO (tnebltd)', url: 'https://www.tnebltd.gov.in/' },
  { name: 'TN-SET (msutnset)', url: 'https://msutnset.com/' },
  { name: 'TN-SET (msuniv)', url: 'https://www.msuniv.ac.in/' },
  { name: 'TN-SET (tnset.in)', url: 'https://tnset.in/' }
];

async function checkUrl(item) {
  return new Promise((resolve) => {
    try {
      const u = new URL(item.url);
      const client = u.protocol === 'https:' ? https : http;
      const req = client.request(
        item.url,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          rejectUnauthorized: false,
          timeout: 8000,
        },
        (res) => {
          resolve({
            name: item.name,
            url: item.url,
            status: res.statusCode,
            location: res.headers.location || null,
            error: null,
          });
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve({ name: item.name, url: item.url, status: 'TIMEOUT', error: 'Request timed out (8s)' });
      });

      req.on('error', (err) => {
        resolve({ name: item.name, url: item.url, status: 'ERROR', error: err.message });
      });

      req.end();
    } catch (err) {
      resolve({ name: item.name, url: item.url, status: 'INVALID', error: err.message });
    }
  });
}

async function run() {
  console.log('Testing named URLs...\n');
  for (const item of testUrls) {
    const res = await checkUrl(item);
    console.log(`[${res.status}] ${res.name.padEnd(30)} -> ${res.url} ${res.location ? '-> REDIRECT: ' + res.location : ''} ${res.error ? 'ERR: ' + res.error : ''}`);
  }
}

run();
