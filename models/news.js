'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  index: Number,
  title: String,
  slug: String,
  image: String,
  alt: String,
  article: String,
}, {timestamps: true});

newsSchema.pre('save', (next) => {
  const newsItem = this;
  newsItem.slug = newsItem.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9_\-]/g, '');
  next();
});

module.exports = mongoose.model('News', newsSchema);
