let id = 4;
let movieStorage = [
    {
        movieTitle: 'Terminator 2',
        movieYear: '1988',
        moviePoster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeHDOQdA4k9qOuZIXg0CtrS-cIqgR6d92G_p5rIhuM2sCifAvz',
        movieDescription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        id: 1
    },
    {
        movieTitle: 'Die Hard 1',
        movieYear: '1986',
        moviePoster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmDn6tUKDhDqyZAUfjEjNq-8lJ8FUddGqgZBeWObkIsF3TWjEbg',
        movieDescription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        id: 2
    },
    {
        movieTitle: 'Rabmo',
        movieYear: '1989',
        moviePoster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdUMIRDjGL5iIHjPT428-0vP0eI53T1IDu1ias3UwdqicZjhDD',
        movieDescription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        id: 3
    },
];



module.exports = {
    addMovie: (data) => {
        data['id'] = id++;
        movieStorage.push(data);
    },

    getMovies: () => {
        return movieStorage.sort((a, b) => {
            return Number(b.movieYear) - Number(a.movieYear);
        })
    }
};