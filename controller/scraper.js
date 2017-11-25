// require cheerio a scraper package
var cheerio = require('cheerio');

// require request which gets the html
var request = require('request');

// pull in the article model
var Article = require('../models/Article');

// the site to scrape
var website = 'https://www.reddit.com/r/bitcoin/';

function scrapeDis(callback) {

	// get the HTML
	request(website, function(error, response, body) {

		// check if there was an error
		if (error) console.log("scraping error", error);

		// save the html
		var $ = cheerio.load(body)

		// scrape
		$('p.title').each(function(i, element) {

			// title is the .text within this
			var title = $(this).text().trim();

			// link is the href on a child element
			var link = $(element).children().attr("href");

			// build the newestArticle object that we will save to db
			var newestArticle = new Article({
				title: title,
				link: link
			});

			// save the Article
			newestArticle.save(function(error) {
				if (error) console.log("article not saved", error);
			}); // end of save function

		}); // end of .each function

		callback();
		
	}); // end of request function

} // end of scrapeDis function

// export the scraping
exports.scrapeDis = scrapeDis;
