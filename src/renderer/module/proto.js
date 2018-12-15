/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars */
'use strict'

var $protobuf = require('protobufjs/light')

var $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root()))
  .addJSON({
    awesomepackage: {
      options: {
        java_outer_classname: 'MessageProto'
      },
      nested: {
        Model: {
          fields: {
            receiver: {
              type: 'string',
              id: 1
            },
            content: {
              type: 'string',
              id: 2
            }
          }
        }
      }
    }
  })

module.exports = $root
