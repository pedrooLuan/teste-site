import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text, Iframe) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text,
      Iframe,
      createdAt: new Date(),
      userId: this.userId,
      qtd_likes: 0,
      qtd_deslikes: 0
    });
  },

  'tasks.likes'(task_id){
    const task = TasksCollection.findOne({_id: task_id})

    return TasksCollection.update({_id: task_id}, {
      $set: {
        qtd_likes: (task.qtd_likes || 0) + 1
      }
    })
  },

  'tasks.deslikes'(tasks_id){
    const tasks = TasksCollection.findOne({_id: tasks_id})

    return TasksCollection.update({_id: tasks_id}, {
      $set: {
        qtd_deslikes: (tasks.qtd_deslikes || 0) + 1
      }
    })
  },


  'tasks.remove'(taskId) {
    check(taskId, String);

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