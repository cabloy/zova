function readPackage(pkg) {
  if (pkg.dependencies && pkg.dependencies['@vue/runtime-core']) {
    pkg.dependencies['@vue/runtime-core'] = 'npm:@cabloy/vue-runtime-core@^3.4.35';
  }
  if (pkg.dependencies && pkg.dependencies['@vue/reactivity']) {
    pkg.dependencies['@vue/reactivity'] = 'npm:@cabloy/vue-reactivity@^3.4.35';
  }
  if (pkg.dependencies && pkg.dependencies['vue-router']) {
    pkg.dependencies['vue-router'] = 'npm:@cabloy/vue-router@^4.4.6';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
