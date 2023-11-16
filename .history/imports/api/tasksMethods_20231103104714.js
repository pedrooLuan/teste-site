import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text, Iframe, comment) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text,
      Iframe,
      comment,
      createdAt: new Date(),
      userId: this.userId,
      qtd_likes: 0,
      qtd_dislikes: 0
    });
  },

  'tasks.likes'(task_id){
    const task = TasksCollection.findOne({_id: task_id})

    return TasksCollection.update({_id: task_id}, {
      $set: {
        qtd_likes: (task.qtd_likes || 0) + 1,
      }
    })
  },

  'tasks.dislikes'(task_id){
    const task = TasksCollection.findOne({_id: task_id})

    return TasksCollection.update({_id: task_id}, {
      $set: {
        qtd_dislikes: (task.qtd_dislikes || 0) + 1,
      }
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    console.log("1");

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
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