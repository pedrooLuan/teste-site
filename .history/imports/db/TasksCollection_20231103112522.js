import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasks');
export const CommentCollection = new Mongo.Collection('comment');