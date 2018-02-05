const http = require('http');
const query = require('querystring');
const url = require('url');

const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');
const xmlHandler = require('./xmlResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStructJSON = {
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const urlStructXML = {
  '/success': xmlHandler.success,
  '/badRequest': xmlHandler.badRequest,
  '/unauthorized': xmlHandler.unauthorized,
  '/forbidden': xmlHandler.forbidden,
  '/internal': xmlHandler.internal,
  '/notImplemented': xmlHandler.notImplemented,
  notFound: xmlHandler.notFound,
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/page1') {
    htmlHandler.getClient(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getStyle(request, response);
  } else if (request.headers.accept === 'text/xml') {
    if (urlStructXML[parsedUrl.pathname]) {
      urlStructXML[parsedUrl.pathname](request, response, params);
    } else {
      urlStructXML.notFound(request, response, params);
    }
  } else if (urlStructJSON[parsedUrl.pathname]) {
    urlStructJSON[parsedUrl.pathname](request, response, params);
  } else {
    urlStructJSON.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);
