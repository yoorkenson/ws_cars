const ws = require('ws');
const randomCar = require('./randomCar');

const wss = new ws.Server(
	{
		port: 5001,
	},
	() => {
		console.log('Server start on 5001 port');
		setInterval(() => {
			const car = randomCar();
			sendCar(car);
			console.log(JSON.stringify(car));
		}, 5000);
	}
);

function sendCar(car) {
	wss.clients.forEach((client) => {
		client.send(JSON.stringify(car));
	});
}