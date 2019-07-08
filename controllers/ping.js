/* eslint class-methods-use-this: ["error", { "exceptMethods": ["status"] }] */

class Ping {
  /**
   * Check whether microservice is working
   * @return {object} status - returns ok that specifies that microservice is working.
   * */
  status(req, res) {
    res.status(200).json({ status: 'ok' });
  }
}

module.exports = Ping;
