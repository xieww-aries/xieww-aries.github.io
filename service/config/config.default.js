exports.keys = 'xieww';

// 添加 view 配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks'
    }
};

exports.static = {
    prefix: '/public/'
};

// 添加 news 的配置项
exports.news = {
    pageSize: 5,
    serverUrl: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0'
};
