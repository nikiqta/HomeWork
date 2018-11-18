import reqHandler from "./requestHandler";

export default function deletePost(postId, route) {

    let deletePost = reqHandler.deletePost(postId);
    let deleteComments = reqHandler.deletePostComments(postId);

    Promise.all([deletePost, deleteComments]).then(() => {
        route === "post" ? window.history.go(0) : window.history.go(-1);
    });
}