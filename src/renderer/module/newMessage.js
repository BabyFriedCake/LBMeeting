/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars */
'use strict'

var $protobuf = require('protobufjs/light')

var $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root()))
  .addJSON({
    com: {
      nested: {
        troila: {
          nested: {
            tcp: {
              nested: {
                model: {
                  nested: {
                    proto: {
                      options: {
                        java_outer_classname: 'MessageProto'
                      },
                      nested: {
                        Message: {
                          fields: {
                            cmd: {
                              type: 'int32',
                              id: 1
                            },
                            from: {
                              type: 'string',
                              id: 2
                            },
                            to: {
                              type: 'string',
                              id: 3
                            },
                            groupid: {
                              type: 'string',
                              id: 4
                            },
                            time: {
                              type: 'string',
                              id: 5
                            },
                            data: {
                              type: 'MessageBody',
                              id: 6
                            }
                          }
                        },
                        MessageBody: {
                          fields: {
                            content: {
                              type: 'string',
                              id: 1
                            },
                            type: {
                              type: 'int32',
                              id: 2
                            },
                            extend: {
                              type: 'string',
                              id: 3
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

module.exports = $root
