function correctError(err) {
    let errorText = '';
    switch (err) {
        case err.startsWith('Cube validation failed: name'):
            errorText = 'Name must be between 3 and 15 symbols!';
            return;
        case err.startsWith('Cube validation failed: description'):
            errorText = 'description must be between 20 and 300 symbols!';
            return;
        case 'Cube validation failed: imageURL':
            errorText = 'ImageURL must begin with "https://" and end with ".jpg" or ".png"';
            return;
    }
    return errorText;
}

module.exports = {
    correctError
};