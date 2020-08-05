'use strict';

/*
 * Function does deep level check for properties and assign.
 * @param {Object} object The object
 * @param {String} propertyString The property string, i.e. 'data.myValue.prop1'
 * @param {Any} defaultValue Default values in case no property found
 * @return {Object} The value of the given property or undefined
 * @example
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
    const propertiesListRegExp = /(?:([\w\s\-]+)\s?)/g; // match all values beetwen . or ' or " or []

    try {
      safeAssignedValue = properties.match(propertiesListRegExp).reduce(function(item, initValue) {
        if(Object.prototype.hasOwnProperty.call(item, initValue) && item[initValue] !== undefined && item[initValue] !== null) {
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
  return safeAssignedValue !== undefined ? safeAssignedValue : null;
}

module.exports = {
  safeAssign: safeAssign
};
