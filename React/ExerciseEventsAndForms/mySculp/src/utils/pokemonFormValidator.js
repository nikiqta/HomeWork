let pokemonFormValidator = (name, image, info) => {
    let validName = (() => {
        if (name !== '') {
            return true
        }
        return false
    })();

    let validImageUrl = (() => {
        if (image.startsWith('http')) {
            return true
        }
        return false
    })();

    let validInfo = (() => {
        if (info !== '') {
            return true
        }
        return false
    })();

    return {
        validName,
        validImageUrl,
        validInfo
    }
};

export default pokemonFormValidator;