var request = require('request-promise');
var cheerio = require('cheerio');

exports.getSource = (page, book) => {
  return new Promise((resolve, reject) => {
    request(
      { uri: `http://www.sacred-texts.com/bib/gnt/${book}${page}.htm`,
        transform: function(body) {
          return cheerio.load(body);
        }
      }
    )
    .then(($) => {
      var chapter = {};
      let arrLength = --$('p').length;
      $('p')
        .each((index, element) => {
          if((index !== arrLength) && (index !== 0)) {
            if(!(page === '021')) {
                chapter[index] = element.children[1].data;
            } 
            else {
              if ((index !== 27) && (index !== 26)) {
                chapter[index] = element.children[1].data;
              }
            }
        } else {
        }
    })
    resolve(chapter);
    })
  })  
}

