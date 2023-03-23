# Satukelas SCORM API wrapper demo

## Running the demo

You must run via webserver so your browser can load the files correctly.  To try this you can use a local webserver.

Depending on what you have installed:

```
# PHP
php -S localhost:8080

# Python 2
python -m SimpleHTTPServer 8080

# Python 3
python -m http.server 8080

# npx
npx http-server -p 8080

# Ruby
ruby -run -e httpd . -p 8080
```

Then open http://localhost:8080

## The SCORM adapter

We've created a basic adapter that provides an object that a SCORM package can call.

The functions required by Satukelas to start are:

* Save the percentage score
* Save any extra score details such as TOEIC categories
* Save the study time for the current session

You can copy and modify the `scorm-adapter.js` to include HTTP calls to your API.  We've included the `Adapter` object but you'll see that the main SCORM calls are handled in `window.API.LMSSetValue`.

## Your API

We are not familiar with your study data API but the adapter method should be flexible enough for you to call whatever endpoints you need to.

For example:

```
onScore: function(score) {
  fetch('/my-api/save-score', { score: score })
}

```
## Example lesson

This demo includes a complete sample SCORM package to make it easy to try.
