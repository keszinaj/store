/**
 * This file contains session defoult setup.
 */

const oneDay = 1000 * 60 * 60 * 24;

let session_settings = {
    secret: 'alkdsjfhjahdfkkjasdfhybaiwfgehadskhuiwty34', 
    name: 'sessionId',
    saveUninitialized: false, //dont save again if not modified
    cookie: { 
        maxAge: oneDay, 
        httpOnly: true //prevent css
        //domain and path could also be set in future for security resons
    },
    resave: false,
    //store: <- todo
}
export default session_settings;