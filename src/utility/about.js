const npmPackage = require('../../package.json')

export const getVersion = () => npmPackage.version
export const getDependencies = () => npmPackage.dependencies
