A simple server intended to be used to test scraping of feeds of items.

What can vary:
- Load times
- Ajax or conventional item / feed loading
- Maximum pages / items in a feed

You can vary the behavior of feeds and items by changing the URL.

# Some examples
- http://127.0.0.1:3004/?feedIsStatic=0
- http://127.0.0.1:3004/?feedIsStatic=0&ItemIsStatic=0
- http://127.0.0.1:3004/?feedIsStatic=0&feedLoadTimeAjax=0

You can start the server using the following command:
node app.js

Then visit:
127.0.0.1:3004/

On the right you will see a panel with the implied URL parameters, as well as some other data.
