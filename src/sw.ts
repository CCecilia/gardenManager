/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {};
// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', function (event) {
  console.log('ServiceWorker | isntalled ', event);
});

self.addEventListener('install', function (event) {
  console.log('ServiceWorker | isntalled ', event);
  return self.clients.claim();
});