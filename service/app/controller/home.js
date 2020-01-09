const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        // this.ctx.body = 'Hello World!';
        await ctx.render('index.tpl');
    }
}

module.exports = HomeController;
