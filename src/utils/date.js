const now = () => new Date.now().toISOString();
const daysFromNow = (days) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

module.exports = { now, daysFromNow };
