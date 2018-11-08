let notify =  (function () {
    function showError(message) {
      return  console.log(message);
    }

    return {showError}
})();

module.exports = {notify};