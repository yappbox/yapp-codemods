const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);

  return j(file.source)
    .find(j.CallExpression, { callee: { property: { name: 'extend' } } })
    .forEach(path => {
      j(path).replaceWith(
        j.classDeclaration(j.identifier("MyComponent"), j.classBody(path.node.arguments[0].properties.map((property) => {
          if (property.method) {
            let newMethodName = property.key.name;
            let kind = "method";
            if (newMethodName === "init") {
              newMethodName = "constructor";
              kind = "constructor";
            }
            return j.methodDefinition(
              kind,
              j.identifier(newMethodName),
              j.functionExpression(null, property.params, property.body, false, false),
              false
            );
          } else if (property.key && property.key.name === 'actions' && property.value.type === "ObjectExpression") {
            return property.value.properties.map((property) => {
              let method = j.methodDefinition(
                "method",
                j.identifier(property.key.name),
                j.functionExpression(null, property.params, property.body, false, false),
                false
              );
              method.decorators = [j.decorator(j.identifier("action"))];
              return method;
            });
          }
          return j.classProperty(
            j.identifier(property.key.name),
            property.value,
            null,
            false
          );
        }).reduce((nodes, node) => nodes.concat(node), [])))
      );
    })
    .toSource();
}
