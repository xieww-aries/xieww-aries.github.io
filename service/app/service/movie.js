const Service = require('egg').Service;

class NewsService extends Service {
    async getMovieList() {
        // read config
        const { serverUrl } = this.config.news;

        const dataList = await this.ctx.curl(serverUrl, {
            dataType: 'json',
            data: {
                type: 'movie',
                tag: '热门',
                page_limit: 50,
                page_start: 0
            }
        });
        console.log('~~~~~~~~~~', dataList);

        return dataList.data.subjects.map(res => res);
    }

    async getDoubanData(request) {
        const { serverUrl } = this.config.news;
        return await this.ctx.curl(serverUrl, {
            dataType: 'json',
            data: request
        });
    }
}

module.exports = NewsService;
