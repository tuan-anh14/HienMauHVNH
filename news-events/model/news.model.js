const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String,
    content: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
});

const New = mongoose.model('New', newsSchema);

module.exports = New;
