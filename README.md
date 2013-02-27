# jquery.googlecover.js

A jQuery based library to fetch book cover images from [Google
API](https://developers.google.com/books/docs/dynamic-links).

## Usage

Grab ISBNs from your HTML page, and give it to the ``gbDynmaicLinks`` jQuery method,
with a callback function that will populate appropriately the page with
book cover image URLs.

The module extend $ jQuery object with a method named `gbDynamicLinks`. In a
browser console, on a page including the library, you can test the result:

```javascript
$.gbDynamicLinks('ISBN:0451526538', function(book) { console.log(book); });
```

You call `$.gbDynamicLinks` to fetch Google Books info with two parameters:

- `isbns` - An array of all requested book ISBN
- `callback(book)` - A function which is called for each retrieved book,
  `book` function parameter containing the book description in [this format](https://developers.google.com/books/docs/dynamic-links#JSONformat)

Already requested ISBNs are cached in private variables. In a single-page
webapp, it will help minimizing the number of requests to the Google service.

## Sample

```html
<html>
  <head>
    <title>jquery.gbdynamiclinks.js Client Sample</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="jquery.gbdynamiclinks.js"></script>
    <script>
    $(document).ready(function(){
       var isbns = [];
       $('span').each(function() {
         isbns.push($(this).attr("isbn"));
       });
       if (isbns.length == 0) return;
       $.gbDynamicLinks(isbns, function(book) { 
           $("span[isbn='"+book.bib_key+"']").each(function() {
               if (book.thumbnail_url == undefined) return;
               var img = document.createElement("img");
               img.src = book.thumbnail_url;
               $(this).append(img); 
           });
       });
    });
    </script>
  </head>
  <body>
    <span isbn="2251005714"/></span>
    <span isbn="2251005714"/></span>
    <span isbn="9780415480635"></span>
    <span isbn="9780821417492"></span>
    <span isbn="2847342257"></span>
    <span isbn="9780563533191"></span>
  </body>
</html>
```

