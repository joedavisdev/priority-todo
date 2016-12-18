/* global QUOTA_EXCEEDED_ERR, angular */

var storage = {
    setItem: function(key, value) {
        if (typeof(localStorage) === 'undefined' ) {
            alert('Your browser does not support HTML5 localStorage');
        } else {
            try {
                localStorage.setItem(key, angular.toJson(value));
            } catch (e) {
                if (e === QUOTA_EXCEEDED_ERR) {
                    alert('Quota exceeded!');
                }
            }
        }
    },
    getItem: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    removeItem: function(key) {
        localStorage.removeItem(key);
    }
};