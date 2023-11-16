import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CommentCollection } from '../db/TasksCollection';

Meteor.methods({
    'comment.insert'(comment) {
      check(comment, String);
    
      if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
      }
    
      CommentCollection.insert({
        comment,
        createdAt: new Date(),
        userId: this.userId
      }),
    },
  
      'comment.setIsChecked'(taskId, isChecked) {
        console.log("2");
        check(taskId, String);
        check(isChecked, Boolean);
    
        if (!this.userId) {
          throw new Meteor.Error('Not authorized.');
        }
    
        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    
        if (!task) {
          throw new Meteor.Error('Access denied.');
        }
    
        TasksCollection.update(taskId, {
          $set: {
            isChecked,
          },
        });
      },
    });