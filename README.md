URL Shortener
=============

## Very basic API to shorten and save URLS
[See it in use](https://url-shortener.wrwebdev.repl.co)

### Install

 - `npm i` to install dependencies from package.json
 - `npm start` to run
 
 ### Database
 
  - Will require access to MongoDB. 
  - Pass access to app through `.env` in variable `MONGODB_URI`
  
### Use

Takes POST request of full length URL at `__URL__/api/shorturl/new` and returns short version in JSON object:
```
{"original_url": "https://foobar.com/", "short_url": "bArf0"}
```
this can be accessed at `__URL__/api/shorturl/bArf0`, which redirects with 302 status back to `https://foobar.com/`

I agree... not exactly shorter at present, but the URLs to listen on are fully customisable in `app.js` where the logic for the project can be found. Sadly, it had to be this way to pass some coursework.
