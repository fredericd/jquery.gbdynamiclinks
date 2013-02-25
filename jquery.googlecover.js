function JGoogleCover() {

    var founds = {};    // Private cache for already found ISBN
    var notfounds = {}; // ISBN not found in Google Books


    // Private Callback
    var callback = function(updateUI, books) {
        for (var isbn in books) {
            var book = books[isbn];
            founds[isbn] = book;
            delete notfounds[isbn];
            updateUI(book);
        }
    };


    // The unique public method
    this.fetch = function(isbns, cbUpdateUI) {
        var bibkeys = [];
        var that = this;
        for (var i = 0; isbn = isbns[i]; i++) {
            var book = founds[isbn];
            if (book) {
                cbUpdateUI(book);
            } else if (notfounds[isbn] == undefined) {
                notfounds[isbn] = 1;
                bibkeys.push(isbn);
            }
        }
        if (bibkeys.length == 0) return;
        var url = "http://books.google.com/books?bibkeys=" + bibkeys.join(',') +
                  "&jscmd=viewapi";
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(books) { return callback.call(that,cbUpdateUI,books); }
        });
    };

};
