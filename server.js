const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

// Express setup
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/create', (req, res) => {

	let address = req.body.url;

	let optionsViewport = {
		width: req.body.screenWidth,
		height: 720
	}

	let optionsScreenshot = {
		path: './media/'+Date.now()+'.jpeg', 
		fullPage: true
	}

	puppeteer.launch().then(async browser => {
	  const page = await browser.newPage();
	  page.setViewport(optionsViewport);
	  await page.goto(address);
	  await page.screenshot(optionsScreenshot);
	  await browser.close();
	}).then(() => {
		console.log(optionsScreenshot.path);
		res.send(optionsScreenshot.path);
	}).catch((err) => {
		console.log(err);
		res.send('error');
	});

});

// Listening to port 3001
app.listen(3100, () => {
	console.log('Listening on port 3100');
});