import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CommentCollection } from '../db/CommentCollection';
import './Task.html';

Template.task.onCreated(function () {
  Meteor.subscribe('comments');
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .likes': function (event, template) {
    Meteor.call('tasks.likes', template.data._id)
  },
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .dislikes': function (event, template) {
    Meteor.call('tasks.dislikes', template.data._id)
  },
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('comment.setIsChecked', this._id, !this.isChecked);
  },
  'submit .form-task-comment'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const { target } = event;
    const comment = target.comment.value;

    // Insert a task into the collection
    Meteor.call('comment.insert', comment, this._id);
    // Clear form
    target.comment.value = '';
  },
});

Template.task.helpers({
  comments() {
    return CommentCollection.find({ idTask: this._id },
      {
        sort: { createdAt: -1 },
        transform: function (comment) {
          comment.createdAt = formatarDataHora(comment.createdAt)
          return comment
        }
      }
    ).fetch();
  },
});

function formatarDataHora(data) {
  // Obtendo os componentes da data
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
  var ano = data.getFullYear();
  var horas = String(data.getHours()).padStart(2, '0');
  var minutos = String(data.getMinutes()).padStart(2, '0');

  // Formatando a data e hora no formato desejado
  var dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

  return dataFormatada;
}
