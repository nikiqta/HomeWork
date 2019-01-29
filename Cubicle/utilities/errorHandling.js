function error(err) {

    const nameErr = 'Name must be between 3 and 15 symbols!';
    const descErr = 'Description must be between 20 and 300 symbols!';
    const imageUrlErr = 'ImageURL must begin with "https://" and end with ".jpg" or ".png"';
    const fieldErr = 'Both field  to and from must be in range of 1 - 6';
    const wrongOrderErr = 'To value must be lower than or equal to From value';


    if( err.startsWith('Cube validation failed: name')) {
        return nameErr;
    } else if(err.startsWith('Cube validation failed: description')){
        return descErr;
    } else if(err === 'Cube validation failed: imageURL') {
        return imageUrlErr;
    } else if (err === 'input validation fieldError') {
        return fieldErr;
    } else if (err === 'input validation wrong order') {
        return wrongOrderErr;
    }
    return
}

module.exports = {
    error
};