var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLbGJGa7BXYHOdoQvsUmdvr6OHzXQf7-YYRLlibWVlmEdAoehgELqLsKhn4j8AuMEWlVzHlYOap2xjhAxeQrnJg",
   "privateKey": "jMDiNsTzEKvjAkBhvOoPsCnwhpqARzZNro9OkIl2Aqg"
};
 
 
webPush.setVapidDetails(
   'mailto:athour.or@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAADkIsn110v1kd6sQv7cLLUweQv%2fQIm%2f9FU5Izlnf%2bcQ2YaweAI9OdnvB83FA4VQG%2ffAiOZYGRjLP0nY5%2fUs9QLfmRqUnHXRR933u010WpjVwYXyPJgdvf2f0Ub0ay%2fHNBG2CYeFvGL6rrIt%2fvN8ASH1yrarY0baYJ%2fVHswPrjouU5imRnZhnoT7YPpp2CsO1lrK6hQ5aPqzDHPVBrm765oZOKh%2bY%2f%2bCqi7qnZB%2fPIw%2bRA9iMJEHhHyZyI7303%2bbArkbbOlVvffEkFUWKKYav5r%2bL8CDc46g9R2%2fhkCuBynSzEwgbEvnnQfT6pBekiU8Aio%3d",
   "keys": {
       "p256dh": "BBjx2Heu8PzDG8fgsubq1lRXtiuaTXdE6NP92h9lxsG2hfeBYx5iNbHmL8ODw+faC9/gwwTYfgiFsxZS5SsQpT4=",
       "auth": "STCa/IhuBNfv+oNUErmRqw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '751811652747',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);