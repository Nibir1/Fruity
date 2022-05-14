// Elements
var elStart_learning;

// Tracking loaded resources

/**
 * This function will take a string value.
 * The value should be the path of the file.
 * It will redirect to the given path.
 * @param {String} value 
 */
const pageRedirector = (value) =>{
    window.location.replace(value);
}

// Document is ready Callback
(() => {
    console.log('Setting up Fruity');

    /**
     * We are getting the start-learning-button
     * If available then on pressing we are redirecting to Stage1.html page by using the pageRedirector function
     */
    elStart_learning = document.getElementById("start-learning-button");
    if(!elStart_learning) throw Error('Couldn\'t find the start-learning-button');
    elStart_learning.addEventListener('click', () =>{
        pageRedirector("./Stage1.html");
    });

})();


















