import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // get all notes, sorted by latest first
        res.status(200).json(notes);
    } catch (error) {
        console.error(`Error in getting all notes: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id); // get specific notes 
        if(!note) return res.status(404).json({ message: `Note ${req.params.id} not found`});
        res.status(200).json(note);
    } catch (error) {
        console.error(`Error in getting all notes: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        const note = new Note({ title, content });
        
        const savedNote = await note.save();

        res.status(201).json({ message: 'Note created successfully', savedNote: savedNote });
    } catch (error) {
        console.error(`Error in create new note: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        if(!updateNote) return res.status(404).json({ message: `Note ${req.params.id} not found`});

        res.status(200).json({ message: `Note ${updatedNote._id} updated successfully`});
    } catch (error) {
        console.error(`Error in updating note ${req.params.id}: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({ message: `Note ${req.params.id} not found`});

        res.status(200).json({ message: `Note ${req.params.id} deleted successfully`});
    } catch (error) {
        console.error(`Error in deleting note ${req.params.id}: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}