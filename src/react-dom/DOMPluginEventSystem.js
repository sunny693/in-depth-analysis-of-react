import {allNativeEvents} from './EventRegistry';

const listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);

function listenToAllSupportedEvents(rootContainerElement) {
  if (rootContainerElement[listeningMarker]) {
    rootContainerElement[listeningMarker] = true;

    allNativeEvents.forEach(function (domEventName) {
      nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement, null);
      listenToNativeEvent(domEventName, true, rootContainerElement, null)
    })
  };
}

export {
  listenToAllSupportedEvents,
}