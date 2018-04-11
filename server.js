var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();
app.use(express.static('public'));
app.use(express.static('data'));
app.use(formidable());

app.get('/get-posts', function (req, res) {
    res.sendFile(__dirname + '/data/posts.json');
    console.log("get request done");
});

app.post('/create-post', function (req, res) {

    var blogpost = req.fields.blogpost; //فیلد بلاگ پست ریکویستمونو قراربده بلاگ پست
    console.log(blogpost);
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        console.log(file);
        var parsedFile = JSON.parse(file); //فایل رو که خوندی به شکل آبجکت جی اس تبدیلش کن که میخوایم یه کارایی سمت کلاینت باش بکنیم
        console.log(parsedFile,"parsedfileeee")

        parsedFile[Date.now()] = blogpost; // حالا میگه اون ریکویست فیلدرو که درحقیقت متن پست هست اضافه کن به فایل
        console.log(parsedFile,"parsedfileeee baed az date now")
        
        var stringifiedFile = JSON.stringify(parsedFile, null, 4); // حالا فایل روبه جی سان تبدیل کن که بشه توی فایل نوشت یعنی نودباش کارکنه
        console.log(stringifiedFile,"stringified file")
        
        fs.writeFile(__dirname + '/data/posts.json', stringifiedFile, function (error) {
        
            if (error) {
                console.error(error);
            }
            res.send({ blogpost: blogpost });
        });
    });
});

app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});
