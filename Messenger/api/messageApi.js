const Message = require('./../models/MessageSchema.js');

function getAllMessages(thread) {
  return Message.find({
     thread: thread._id
  });
}

function createMsg(content, user, thread) {
     return Message.create({
         content,
         user,
         thread
     });
}

function removeMsg(id) {
    return Message.find({
        thread: id
    }).remove();
}

module.exports = {
    getAllMessages,
    createMsg,
    removeMsg
};