import "@testing-library/jest-dom/extend-expect";

global.fetch = require('node-fetch');
console.error = function(){}; //TODO: remove when fixed https://github.com/facebook/react/issues/14769
