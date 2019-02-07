const threadApi = require('./../api/threadApi.js');
const userApi = require('./../api/uaserApi.js');
const messageApi = require('./../api/messageApi.js');

module.exports = {
    findThread: async (req, res) => {
        const {username} = req.body;
        const user = req.user ? req.user : '';
        const searchedUser = await userApi.userCheck(username);

        if (!searchedUser) {
            res.render('home/index', {
                error: 'User does not exist in the system!'
            });
            return;
        }

        try {
            await threadApi
                .checkThreadExistence(user, searchedUser)
                .then(thread => {
                    res.redirect(`/thread/${searchedUser.username}`);
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
    },
    getThread: async (req, res) => {
        const {otherUser} = req.params;
        const user = req.user ? req.user : '';

        try {
            const searchedUser = await userApi.userCheck(otherUser);
            const thread = await threadApi.findThread(user, searchedUser);
            let messages = await messageApi.getAllMessages(thread);

            messages.forEach(message => {
                if(message.user.toString() !== user._id.toString()) {
                    message['myMsg'] = true;
                }
                if(message.content.startsWith('http') &&
                    (message.content.endsWith('.jpg') ||
                        message.content.endsWith('.png'))) {
                    message['isImage'] = true;
                }
            });

            res.render('threads/chatroom', {
                otherUser,
                messages,
                threadId: thread._id
            });

        } catch (e) {
            console.log(e);
        }

    },
    sendMessage: async (req, res) => {
        const { threadId, message} = req.body;
        const { otherUser } = req.params;
        try {
            const searchedUser = await userApi.userCheck(otherUser);
            await messageApi.createMsg(message, searchedUser._id, threadId);
            res.redirect(`/thread/${otherUser}`);
        } catch(e) {
            console.log(e);
        }
    }
};
