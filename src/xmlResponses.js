
const respond = (request, response, status, message) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(message);
  response.end();
};

const success = (request, response) => {
  let message = '<response>';
  message = `${message}<message>This was successful.</message>`;
  message = `${message}</response>`;
  return respond(request, response, 200, message);
};

const badRequest = (request, response, params) => {
  let message = '<response>';
  if (!params.valid || params.valid !== 'true') {
    message = `${message}<message>Your request had some kind of problem with it.</message>`;
    message = `${message}<id>badRequest</id>`;
  } else {
    message = `${message}<message>This was a successful response.</message>`;
	return respond(request, response, 200, message);
  }
  message = `${message}</response>`;
  return respond(request, response, 400, message);
};

const unauthorized = (request, response, params) => {
  let message = '<response>';
  if (!params.loggedIn || params.LoggedIn !== 'true') {
    message = `${message}<message>You aren't authorized</message>`;
    message = `${message}<id>unauthorized</id>`;
  } else {
    message = `${message}<message>You are logged in</message>`;
	return respond(request, response, 200, message);
  }
  message = `${message}</response>`;
  return respond(request, response, 401, message);
};

const forbidden = (request, response) => {
  let message = '<response>';
  message = `${message}<message>You are Forbidden</message>`;
  message = `${message}<id>forbidden</id>`;
  message = `${message}</response>`;
  return respond(request, response, 403, message);
};

const internal = (request, response) => {
  let message = '<response>';
  message = `${message}<message>There has been an internal server error.</message>`;
  message = `${message}<id>internalError</id>`;
  message = `${message}</response>`;
  return respond(request, response, 500, message);
};

const notImplemented = (request, response) => {
  let message = '<response>';
  message = `${message}<message>That isn't implemented.</message>`;
  message = `${message}<id>notImplemented</id>`;
  message = `${message}</response>`;
  return respond(request, response, 501, message);
};

const notFound = (request, response) => {
  let message = '<response>';
  message = `${message}<message>Such a thing hasn't been found.</message>`;
  message = `${message}<id>notFound</id>`;
  message = `${message}</response>`;
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
