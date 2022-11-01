const { v5: uuid } = require('uuid');

const domain = '2fec4e9e-ed48-4bab-8d26-4a2de711be90';

module.exports = {
  getUuid(type, id) {
    return uuid(`${type}/${id}`, domain);
  },
};
