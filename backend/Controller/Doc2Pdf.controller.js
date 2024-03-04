module.exports = {
    doc2pdf: async (req, res, next) => {
        console.log('this is server');
        console.log(req);
        // call lambda function...
        res.send({success: true});
    }
}