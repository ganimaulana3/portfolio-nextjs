const { Schema, models, model, SchemaType } = require('mongoose');

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentpera: { type: String },
    createdAt: { type: Date, default: Date.now },
    maincomment: { type: Boolean },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    children: { type: Schema.Types.ObjectId, ref: 'Comment' },
    parentName: { type: String },
}, {
    timestamps: true,
});

export const Comment = models.Comment || model('Comment', CommentSchema, 'comments');