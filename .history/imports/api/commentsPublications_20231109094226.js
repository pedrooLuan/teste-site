import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/CommentCollection';

Meteor.publish('comments', function publishTasks() {
  return CommentCollection.find({ userId: this._Id });
});