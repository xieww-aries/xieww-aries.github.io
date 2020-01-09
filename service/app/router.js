module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/movie', controller.movie.list);
    router.get('/movie/douban', controller.movie.getMovieList);
    router.get('*', controller.home.index);
};
