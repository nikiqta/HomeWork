const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_Sy19o9zHm";
const kinveyAppSecret = "5052cc1ad7ec435680f7853c7797779c";


let reqHandler = {
  login: (payload) => {
      return fetch(`${kinveyBaseUrl}user/${kinveyAppKey}/login`, {
          method: 'POST',
          headers: {
              'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      })
          .then(res => {
              return res.json();
          });
  },
    register: (payload) => {
      return fetch(`${kinveyBaseUrl}user/${kinveyAppKey}`, {
          method: 'POST',
          headers: {
              'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      })
          .then(res => {
              return res.json();
          });
    },
    getPosts: () => {
      return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/posts?query={}&sort={"_kmd.ect": -1}`,{
          method: 'GET',
          headers: {
              'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
              'Content-Type': 'application/json'
          }
      }).then(res => {
          return res.json();
      });
    },
    getUserPosts: (username) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },
    createPost: (data) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/posts`,{
            method: 'POST',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        });
    },
    getPostDetails: (postId) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/posts/${postId}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },
    getPostComments: (postId) => {
       return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
           return res.json();
       });
    },
    createComment: (data) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/comments`,{
            method: 'POST',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        });
    },
    editPost: (postId, data) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/posts/${postId}`,{
            method: 'PUT',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        });
    },
    deletePost: (postId) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/posts/${postId}`,{
            method: 'DELETE',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },
    deletePostComments: (postId) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/comments?query={"postId":"${postId}"}`,{
            method: 'DELETE',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },
    deleteComment: (commentId) => {
        return fetch(`${kinveyBaseUrl}appdata/${kinveyAppKey}/comments/${commentId}`,{
            method: 'DELETE',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    }
};

export default reqHandler;