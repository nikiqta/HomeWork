function error(err) {

    const nameErr = 'Name must be between 3 and 15 symbols!';
    const descErr = 'Description must be between 20 and 300 symbols!';
    const imageUrlErr = 'ImageURL must begin with "https://" and end with ".jpg" or ".png"';


    if( err.startsWith('Cube validation failed: name')) {
        return nameErr;
    } else if(err.startsWith('Cube validation failed: description')){
        return descErr;
    } else if('Cube validation failed: imageURL') {
        return imageUrlErr;
    }
    return
}

module.exports = {
    error
};