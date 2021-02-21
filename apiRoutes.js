// require fs

const fs = require("fs");

//api routing: 
module.exports = (app) => {
    
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
// using getting function and resturn json
    app.get("/api/notes", (req, res) => {
        return res.json(noteList);
    });

    // using post 
    app.post('/api/notes', (req, res) => {
        // get Id of last note if it exists
        let lastId;
        if (noteList.length) {
            lastId = Math.max(...(noteList.map(note => note.id)));
        // set to 0
        } else {
            lastId = 0;
        }
        
        //begins the id's at 1
        const id = lastId + 1;

        // using push function to push the id 
        noteList.push({ id, ...req.body });
        // pop last index 
        res.json(noteList.slice(-1));
    });

    // using delete function to delete the id 
    app.delete('/api/notes/:id', (req, res) => {
        
        let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

        //deleting the note using splice
        noteList.splice(noteList.indexOf(findNote), 1);
        res.end("Note was deleted");
    });
};