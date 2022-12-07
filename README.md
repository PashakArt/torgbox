# trogbox

Module for converting various date formats to ISO 8601

## Install

    npm init
    
## Test

    npm test
    

### Work description
For the correct date format, the parseValidDate function was used, which formatted the input date if necessary. To work with time, I used the built-in object **Date**. In case of receiving a string that cannot be a valid date, I parsed this string using **regular expressions**.
### Modules
* source.js - main module, launch point
* helper.js - a module that contains part of the functionality for working with data
* reg-exps.js - module containing the used regular expressions
