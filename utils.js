'use strict';

/*
* Function does deep level check for properties and assign.
* let test = {
      a: {
        b: [
          {a: 1},
          {b: 2}
        ]
      }
    };
    const newObj = safeAssign(test, 'a.b[1]'); // {b: 2}
    const newObj2 = safeAssign(test, 'a.b[123]'); // null
*/

function safeAssign(object, properties, defaultValue) {
  let safeAssignedValue;
  if(properties && typeof properties === 'string') {
    const propertiesListRegExp = /(?:([\w\s]+)\s?)/g; // match all values beetwen . or ' or " or []

    try {
      safeAssignedValue = properties.match(propertiesListRegExp).reduce(function(item, initValue) {
        if(Object.prototype.hasOwnProperty.call(item, initValue) && item[initValue]) {
          return item[initValue];
        } else { // eslint-disable-line
          throw { // eslint-disable-line
            error: 'Reference error! Properties is not defined'
          };
        }
      }, object);
    } catch (e) {
      safeAssignedValue = defaultValue;
    }
  }
  return safeAssignedValue || null;
}

module.exports = {
  safeAssign: safeAssign
};
