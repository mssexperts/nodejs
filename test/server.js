const sinon = require('sinon');
const authenticate = require('@coreplatform/authentication-middleware');

const sandbox = sinon.createSandbox();
const stubObj = sandbox.stub().callsFake((req, res, next) => next());

sandbox.stub(authenticate, 'authentication').callsFake(() => stubObj);

module.exports = require('../server');
