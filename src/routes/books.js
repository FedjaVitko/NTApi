import express from 'express';

const router = express.Router();

import scraper from '../scraper';

import Books from '../models/Books';

const getBook = (bookTitle) => {
    return new Promise((resolve, reject) => {
        var book = {};
        let page = 0;
        let counter = 0;
        for(let i = 1; i < 22; i++) {
            if (i < 10) {
               page = `00${i}`;
            } else if (i < 100) {
               page = `0${i}`;
            } else {
               page = i;
            }
    
            let chap = {};
            scraper.getSource(page, bookTitle).then((chapter) => {
                chap = chapter;
                counter++;
                book[i] = chap;
                if (counter === 21) {
                    resolve(book);
                } else {

                }
            })
        }
    })
}

router.get('/:id', (req, res) => {
    // getBook(req.params.id)
    // .then(
    //     (book) => res.send(book)
    // );
    let id;
    switch (req.params.id) {
        case 'mat' : 
            id = '59eae6602bce49d0d3383b7c';
            break;
        case 'mar' : 
            id = '59eae67e2bce49d0d3383b84';
            break;
        case 'luk' :
            id = '59eae69e2bce49d0d3383b91';
            break;
        case 'joh' :
            id = '59eae6b72bce49d0d3383b99';
            break;
    }
    Books.findById(id).then(book => {
        res.send(book);
    });
})

export default router;