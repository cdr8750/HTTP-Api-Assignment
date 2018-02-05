
const respond = (request, response, status, message) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(message));
  response.end();
};

const success = (request, response) => {
  const message = {
    message: 'Everything is fine',
  };
  return respond(request, response, 200, message);
};

const badRequest = (request, response, params) => {
  const message = {
    message: "It's fine I guess.",
  };
  if (!params.valid || params.valid !== 'true') {
    message.message = 'Your request had some kind of problem with it.';
    message.id = 'badRequest';
    return respond(request, response, 400, message);
  }
  return respond(request, response, 200, message);
};

const unauthorized = (request, response, params) => {
  const message = {
    message: 'You are logged in.',
  };
  if (!params.loggedIn || params.loggedIn !== 'true') {
    message.message = "You aren't authorized to be here.";
    message.id = 'unauthorized';
    return respond(request, response, 401, message);
  }
  return respond(request, response, 200, message);
};

const forbidden = (request, response) => {
  const message = {
    message: "You aren't allowed to be here.",
    id: 'forbidden',
  };
  return respond(request, response, 403, message);
};

const internal = (request, response) => {
  const message = {
    message: "The server is broken.",
    id: 'internalError',
  };
  return respond(request, response, 500, message);
};

const notImplemented = (request, response) => {
  const message = {
    message: 'Such a feature has not been implemented yet.',
    id: 'notImplemented',
  };
  return respond(request, response, 501, message);
};

const notFound = (request, response) => {
  const message = {
    message: "Whatever you wanted doesn't seem to exist.",
    id: 'notFound',
  };
  return respond(request, response, 404, message);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
