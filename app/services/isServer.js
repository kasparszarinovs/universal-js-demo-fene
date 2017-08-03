module.exports = function () {
  return process && !process.browser || !window;
};