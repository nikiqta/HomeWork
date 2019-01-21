module.exports = (res, data, statusCode, contentType) => {
    res.writeHead(statusCode, {
        'content-type': contentType
    });
    res.write(data);
    res.end();
};