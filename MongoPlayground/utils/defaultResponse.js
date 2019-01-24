module.exports = (res, data, statusCode, contentType, images) => {

    let html = '';
    for (let image of images) {
        if (Array.isArray(image)){
            image = image[0];
        }
        html += `<fieldset>
                    <img alt="poster" src="${image._doc.url}">
                    <p>${image._doc.description}<p/>
                    <button onclick="location.href='/delete?id=${image._doc._id}'" class="deleteBtn">Delete
                    </button> 
                 </fieldset>`;
    }

    data = data.toString().replace('<div class="replaceMe"></div>', html);

    res.writeHead(statusCode, {
        contentType
    });
    res.write(data);
    res.end();
};