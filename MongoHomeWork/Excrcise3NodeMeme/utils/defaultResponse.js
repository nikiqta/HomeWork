module.exports = (res, data, statusCode, contentType) => {
    res.writeHead(statusCode, {
        contentType
    });
    res.write(data);
    res.end();
};