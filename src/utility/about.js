const npmPackage = require('../../package.json')
const shrinkWrap = require('../../npm-shrinkwrap.json')

export const getVersion = () => npmPackage.version
export const getDependencies = () => {
  const deps = npmPackage.dependencies
  const versions = {}
  for (const dep in deps) {
    versions[dep] = {
      spec: deps[dep],
      resolved: shrinkWrap.dependencies[dep].version
    }
  }
  return versions
}
