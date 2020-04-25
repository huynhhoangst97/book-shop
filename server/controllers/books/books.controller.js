const bookItemsDB = require('../../model/book-item.model');
const { body, validationResult } = require('express-validator');

module.exports.validate = (method) => {
    switch (method) {
        case 'insertBook': {
            return [
                body('name').not().isEmpty().trim().escape(),
                body('author').not().isEmpty().trim().escape(),
                body('release').not().isEmpty().trim().escape(),
                body('price').not().isEmpty().trim().escape(),
                body('number','Number required').not().isEmpty().trim().escape(),
                body('number','Wrong format').isInt()
            ]
        }
    }
}

module.exports.getBookAll = async (req, res) => {
    const bookItems = await bookItemsDB.find({});
    res.status(200).json(bookItems);
}

module.exports.insertBook = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // let { name, author, release, price, number } = req.body

    // if(name === undefined | author === undefined | release === undefined | price === undefined | number === undefined) {
    //     res.status(400).json({
    //         error: "Invalid Attribute"
    //     });
    //     return;
    // }

    // const objectData = {
    //     name: name.toLowerCase(),
    //     author: author.toLowerCase(),
    //     release: release,
    //     price: price,
    //     number: number
    // }

    // data = await bookItemsDB.find({name: objectData.name});

    // if(data != '') {
    //     if ( data[0]['author'] === objectData.author ) {
    //         res.status(200).json({
    //             result: "Book is exist"
    //         });
    //         return;
    //     }
    // }
    
    // await bookItemsDB.create(objectData)

    // res.status(200).json({
    //     status: 'OK',
    //     result: {objectData}
    // });
}