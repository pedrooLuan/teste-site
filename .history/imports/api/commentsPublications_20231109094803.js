import { Meteor } from 'meteor/meteor';
import { CommentCollection } from '/imports/db/CommentCollection';

Meteor.publish('comments', function publishComment(idTask) {
  return CommentCollection.find({ idTask });
});