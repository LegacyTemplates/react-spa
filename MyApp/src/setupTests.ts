import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

declare var global: any;

const packageConfig = require("../package.json");
global.BaseUrl = packageConfig["proxy"];

global.fetch = require('node-fetch');
console.error = function(){}; //TODO: remove when fixed https://github.com/facebook/react/issues/14769