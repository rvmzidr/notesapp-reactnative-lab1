import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import NoteInput from "../components/NoteInput";

// Sample initial notes data
const initialNotes = [
  {
    id: "1",
    content: "Learn React Native",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    content: "Complete the tutorial",
    createdAt: new Date().toISOString(),
  },
];

export default function NotesScreen() {
  const [notes, setNotes] = useState(initialNotes);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const closeModal = () => {
    setModalVisible(false);
    setNoteText("");
    setEditingNote(null);
  };

  // Function to add a new note
  const addNote = () => {
    if (noteText.trim() === "") return;

    if (editingNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                content: noteText,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
      setEditingNote(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now().toString(),
        content: noteText,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    closeModal();
  };

  // Function to delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Function to open edit mode
  const editNote = (note) => {
    setEditingNote(note);
    setNoteText(note.content);
    setModalVisible(true);
  };

  // Note item component
  const renderNote = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteContent}>{item.content}</Text>
      <View style={styles.noteActions}>
        <TouchableOpacity onPress={() => editNote(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingNote(null);
            setNoteText("");
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notes yet. Create one!</Text>
        </View>
      )}

      <NoteInput
        visible={modalVisible}
        onClose={closeModal}
        onSave={addNote}
        noteText={noteText}
        setNoteText={setNoteText}
        isEditing={Boolean(editingNote)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 100,
    backgroundColor: "#3498db",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#3498db",
    fontWeight: "bold",
    marginTop: -2,
  },
  notesList: {
    padding: 15,
  },
  noteItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  noteActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    color: "#3498db",
    marginRight: 15,
  },
  deleteButton: {
    color: "#e74c3c",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#7f8c8d",
  },
});