const _ = require('lodash');

function isEmptyOrNil(value) {
    return _.isNil(value) || _.isEmpty(value);
}

module.exports = {
    isEmptyOrNil
}