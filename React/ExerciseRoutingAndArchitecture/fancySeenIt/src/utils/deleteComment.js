import reqHandler from "./requestHandler";

export default function deleteComment(commentId) {

    reqHandler.deleteComment(commentId).then(() => {
        window.history.go(0);
    });
}