const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Save{
    read(){
        return readFileAsync('db/db.json', 'utf8');
    }
    write(notes){
        return writeFileAsync('db/db.json', JSON.stringify(notes));
    }
    getNotes(){
        return this.read().then((notes) => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes));
            }catch (err) {
                parseNotes = [];
            }
            return parseNotes;
        });
    }
    addNotes(notes){
        const{title, text} = notes;
        if (!title || !text) {
            throw new Error("Title and Text are empty.");
        }
        const newNotes = {title, text, id: uuidv1()};
        return this.getNotes().then((note) => [
            ...note,newNotes 
        ])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNotes);
    }
    removeNotes(id){
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((updatedNotes) => this.write(updatedNotes))
    }
}

module.exports = new Save();