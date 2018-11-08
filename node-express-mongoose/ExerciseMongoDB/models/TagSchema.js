const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {type: mongoose.SchemaTypes.String, required: true},
    creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
    images: {type: Array}
});

tagSchema.methods.tagNameToLowerCase = function(){
  return `${this.name.toLowerCase()}`  ;
};

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;