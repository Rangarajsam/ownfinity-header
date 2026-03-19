const packageJsonCommon = require('../package.json');

const moduleFederationConfig = {
    name:'header',
    filename:'remoteEntry.js',
    exposes:{
        './HeaderApp':'./src/bootstrap.tsx'
    },
    remotes:{
        container:'container@http://localhost:2000/remoteEntry.js',
    },
    shared: {
        ...packageJsonCommon.dependencies,
        mitt: { singleton: true, strictVersion: false, requiredVersion: false }
    }
}

module.exports = moduleFederationConfig;