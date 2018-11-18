let validationFunc = (mail, confirmMail, username, password, confirmPassword, name, image, info) => {
    let validMail = (() => {
        let mailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        let testMail = mailRegex.test(mail);
        if (testMail && mail !== '') {
            return true
        }
        return false
    })();

    let validConfirmEmail = (() => {
        let mailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        let testMail = mailRegex.test(confirmMail);
        if (testMail && confirmMail !== '' && confirmMail === mail) {
            return true
        }
        return false

    })();

    let validName = (() => {
        if (username !== '') {
            return true
        }
        return false
    })();

    let validPassword = (() => {
        if (
            password.length > 7 &&
            password !== ''
        ) {
            return true
        }
        return false
    })();

    let validConfirmPassword = (() => {
        if (
            password !== '' &&
            password === confirmPassword
        ) {
            return true
        }
        return false
    })();

    let validPokemonName = (() => {
        if(name !== ''){
            return true;
        } return false;
    })();

    let validImage = (() => {
        if(image.startsWith('https://')){
            return true;
        } return false;
    })();

    let validInfo = (() => {
        if(info !== ''){
            return true;
        } return false;
    })();

    return {
        validMail,
        validName,
        validConfirmEmail,
        validPassword,
        validConfirmPassword,
        validPokemonName,
        validImage,
        validInfo
    }
};

export default validationFunc
