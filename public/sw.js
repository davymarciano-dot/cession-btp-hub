// Service Worker pour les Push Notifications
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let data = { title: 'Notification', body: 'Nouvelle alerte' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }
  
  const options = {
    body: data.body || data.message || 'Vous avez une nouvelle notification',
    icon: data.icon || '/logo-cessionbtp.png',
    badge: data.badge || '/favicon.png',
    vibrate: data.vibrate || [200, 100, 200],
    data: data.data || {},
    actions: [
      {
        action: 'view',
        title: '👁️ Voir',
        icon: '/icons/view.png'
      },
      {
        action: 'dismiss',
        title: '✖️ Ignorer',
        icon: '/icons/dismiss.png'
      }
    ],
    tag: data.type || 'notification',
    requireInteraction: false,
    timestamp: Date.now()
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'CessionBTP', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const actionUrl = event.notification.data?.actionUrl || '/dashboard';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Vérifier si une fenêtre est déjà ouverte
      for (const client of clientList) {
        if (client.url.includes(actionUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Ouvrir une nouvelle fenêtre
      if (clients.openWindow) {
        return clients.openWindow(actionUrl);
      }
    })
  );
});

self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event);
});

// Gestion des messages depuis le client
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
