#!/bin/sh

node --inspect-brk `which jscodeshift` --runInBand --dry -t index.js __testfixtures__/basic-component.input.js
