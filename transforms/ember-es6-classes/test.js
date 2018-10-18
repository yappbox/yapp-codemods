'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({
  type: 'jscodeshift',
  name: 'ember-es6-classes',
});