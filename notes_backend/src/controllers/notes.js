'use strict';

const notesStore = require('../services/notesStore');

/**
 * Controller for Notes resource.
 */
class NotesController {
  // PUBLIC_INTERFACE
  /**
   * List notes with optional pagination.
   * Query params: offset, limit
   */
  list(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0;
    const limit = Math.min(Number.parseInt(req.query.limit, 10) || 50, 100);
    const result = notesStore.list(offset, limit);
    return res.status(200).json(result);
  }

  // PUBLIC_INTERFACE
  /**
   * Get one note by id
   */
  getOne(req, res) {
    const { id } = req.params;
    const note = notesStore.get(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(200).json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new note
   * Body: { title: string, content: string }
   */
  create(req, res) {
    const { title, content } = req.body || {};
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }
    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({ error: 'Content must be a string' });
    }
    const note = notesStore.create({ title: title.trim(), content: content || '' });
    return res.status(201).json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * Update an existing note by id
   * Body: { title?: string, content?: string }
   */
  update(req, res) {
    const { id } = req.params;
    const { title, content } = req.body || {};

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'If provided, title must be a non-empty string' });
    }
    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({ error: 'If provided, content must be a string' });
    }

    const updated = notesStore.update(id, {
      ...(title !== undefined ? { title: title.trim() } : {}),
      ...(content !== undefined ? { content } : {}),
    });
    if (!updated) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(200).json(updated);
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note by id
   */
  delete(req, res) {
    const { id } = req.params;
    const ok = notesStore.delete(id);
    if (!ok) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(204).send();
  }
}

module.exports = new NotesController();
