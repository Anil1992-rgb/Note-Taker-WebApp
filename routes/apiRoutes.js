const fs = require("fs");
const path = require("path");

module.exports = app => {
    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function(req, res) {

        var dbArr = [];

        const dbNotes = fs.readFileSync("./db/db.json");

        dbArr = JSON.parse(dbNotes)

        var newNote = {
            id: dbArr.length + 1,
            title: req.body.title,
            text: req.body.text
        }

        dbArr.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(dbArr), () => {
            // if (err) throw error;
        })
        res.json(true);
    });
};