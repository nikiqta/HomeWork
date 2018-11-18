let validationFunc = (
    mail,
    confirmMail,
    username,
    password,
    confirmPassword,
    loginEmail,
    loginPassword
) => {
    let validMail = (() => {
            let mailRegex = new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            let testMail = mailRegex.test(mail);
            if (testMail && mail === confirmMail && mail !== '') {
                return true
            }
            return false
    })();

    let validLoginEmail = (() => {
        let mailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (mailRegex.test(loginEmail)) {
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
        if (password) {
            if (
                password.length > 7 &&
                password !== '' &&
                password === confirmPassword
            ) {
                return true
            }
            return false
        } else {
            return false
        }
    })();

    let validLoginPassword = (() => {
        if (loginPassword){
            if (
                loginPassword.length > 7 &&
                loginPassword !== ''
            ) {
                return true
            }
            return false
        } else {
            return false
        }
    })();

    return {
        validMail,
        validName,
        validPassword,
        validLoginEmail,
        validLoginPassword
    }
};

export default validationFunc
