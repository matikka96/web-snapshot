const bodyParser = require('body-parser');

// Webshot Setup
// const webshot = require('webshot');
// Routes
// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/app.html');
// });

// app.post('/create', (req, res) => {
// 	let options = req.body.optionsFromSite;
// 	let address = req.body.url;
// 	let fileLocation = './media/'+Date.now()+'.jpg';
// 	webshot(address, fileLocation, options, (err) => {
// 	  if (err) {
// 	  	console.log(err);
// 	  	res.send('error');
// 	  } else {
// 	  	res.send(fileLocation);
// 	  }
// 	});

// });

const puppeteer = require('puppeteer');

// Express setup
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));
app.use( bodyParser.json() );


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/app.html');
});

app.post('/create', (req, res) => {
	// let options = req.body.optionsFromSite;

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

// Listening to port 3000
app.listen(3000, () => {
	console.log('Listening on port 3000');
});