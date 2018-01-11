var mongoose = require('mongoose');
var schema = mongoose.Schema;

var NoteSchema = new schema({
    text: {
        type: String,
        required: false,
        trim: true,
        date: {
            type: Date,
            default: Date.now
          }
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;