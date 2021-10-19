const allNativeEvents = new Set;
let registrationNameDependencies = {};
  
function registerDirectEvent(registrationName, dependencies) {
  registrationNameDependencies[registrationName] = dependencies;
  for (registrationName = 0; registrationName < dependencies.length; registrationName++) allNativeEvents.add(dependencies[registrationName])
}

export {
  allNativeEvents,
  registerDirectEvent,
}