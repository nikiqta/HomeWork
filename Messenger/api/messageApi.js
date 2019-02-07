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

module.exports = {
    getAllMessages,
    createMsg
};