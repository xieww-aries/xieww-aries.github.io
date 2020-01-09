const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const movieList = await ctx.service.movie.getMovieList();
    await ctx.render('movie.tpl', { list: movieList });
  }
  async getMovieList() {
    const ctx = this.ctx;
    const request = ctx.request.body;
    const response = await ctx.service.movie.getDoubanData(request);
    console.log(111222333, response.data.subjects);
    ctx.body = response.data.subjects;
  }
}

module.exports = NewsController;
