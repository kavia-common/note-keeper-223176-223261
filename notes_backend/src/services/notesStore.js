'use strict';

/**
 * In-memory notes store with basic CRUD operations.
 * For production, replace with a persistent datastore (e.g., DB).
 */
const { randomUUID } = require('crypto');

class NotesStore {
  constructor() {
    /** @type {Array<{id:string,title:string,content:string,createdAt:string,updatedAt:string}>} */
    this.notes = [];
  }

  /**
   * Create a new note.
   * @param {{title:string, content:string}} payload
   * @returns {{id:string,title:string,content:string,createdAt:string,updatedAt:string}}
   */
  create(payload) {
    const now = new Date().toISOString();
    const note = {
      id: randomUUID(),
      title: payload.title,
      content: payload.content,
      createdAt: now,
      updatedAt: now,
    };
    this.notes.push(note);
    return note;
  }

  /**
   * List notes with optional pagination.
   * @param {number} [offset=0]
   * @param {number} [limit=50]
   * @returns {{data: any[], total:number, offset:number, limit:number}}
   */
  list(offset = 0, limit = 50) {
    const total = this.notes.length;
    const data = this.notes.slice(offset, offset + limit);
    return { data, total, offset, limit };
  }

  /**
   * Get a note by id.
   * @param {string} id
   * @returns {any|null}
   */
  get(id) {
    return this.notes.find(n => n.id === id) || null;
  }

  /**
   * Update a note by id.
   * @param {string} id
   * @param {{title?:string, content?:string}} payload
   * @returns {any|null}
   */
  update(id, payload) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const existing = this.notes[idx];
    const updated = {
      ...existing,
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    this.notes[idx] = updated;
    return updated;
  }

  /**
   * Delete a note by id.
   * @param {string} id
   * @returns {boolean} true if deleted
   */
  delete(id) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return false;
    this.notes.splice(idx, 1);
    return true;
  }
}

module.exports = new NotesStore();
