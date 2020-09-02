/**
 * 序列化 url 参数
 *
 * @param {String} url
 * @return {Object}
 */
export function serializeUrl(url) {
    const result = {};
    const urlList = (url || '').split('?');
    if (urlList.length > 1) {
        const map = urlList[1].split('&');
        for (let i = 0, len = map.length; i < len; i++) {
            const strList = map[i].split('=');
            if (strList.length > 1) {
                result[strList[0]] = strList[1];
            }
        }
    }
    return result;
}

/**
 * 反序列化 url 参数
 *
 * @param {Object} opts
 * @return {String}
 */
export function deserializeUrl(opts) {
    const searchList = [];

    for (const key in opts) {
        const value = typeof opts[key] === 'undefined' ? '' : opts[key];
        searchList.push(`${key}=${value}`);
    }

    const search = searchList.join('&');

    return search;
}

/**
 * 附加 url 参数
 *
 * @param {String} url
 * @param {String} query like: name=bob
 * @return {String}
 */
export function appendQuery(url, query) {
    if (query === '' || query === undefined) return url;
    return `${url}&${query}`.replace(/[&?]{1,2}/, '?');
}

/**
 * 替换 url 参数
 *
 * @param {String} url
 * @param {String} key
 * @param {String} value
 * @return {String}
 */
export function updateQuery(url, key, value) {
    if (key === '' || key === undefined) return url;
    if (value === undefined) return url;

    const reg = new RegExp(`([?&])?${key}=([^&])*`);
    return url.replace(reg, `$1${key}=${value}`);
}

/**
 * 移除 url 参数
 *
 * @param {String} url
 * @param {String} key
 * @return {String}
 */
export function removeQuery(url, key) {
    if (key === '' || key === undefined) return url;

    const reg = new RegExp(`([?&])?${key}=[^&]*`);
    return url.replace(reg, '').replace(/[&?]{1,2}/, '?');
}

export function removeQuerys(...args) {
    const [url, ...keyList] = args;

    return keyList.reduce((acc, curr) => removeQuery(acc, curr), url);
}

/**
 * 获取 url 中的参数
 *
 * @method getParamFromUrl
 * @param {String} key
 * @param {String} defaultVal
 * @param {String} search location.search
 * @param {boolean} ignoreCase 是否忽略大小写，默认不忽略
 * @return {String}
 */
export function getParamFromUrl(
    key,
    defaultVal,
    search = location.search,
    ignoreCase = true
) {
    const regExp = ignoreCase
        ? new RegExp(`[?|&]${key}=([^&]+)`, 'i')
        : new RegExp(`[?|&]${key}=([^&]+)`);
    const match = regExp.exec(search);
    return match ? match[1] : defaultVal;
}

/**
 * 获取 url 中的参数
 *
 * @param {String} key
 * @param {String} search location.search
 * @return {String}
 */
export function getParam(key, search = location.search) {
    const value = getParamFromUrl(key, '', search);

    return typeof value !== 'undefined'
        ? decodeURIComponent(value)
        : '';
}

/**
 * 添加参数置前处理
 *
 * @param {string} key
 * @param {string} value
 * @param {string} url
 * @return {string}
 */
export function prependQuery(key, value, url) {
    let search = url || window.location.search;
    if (key && value) {
        search = `?${key}=${value}&${search.replace(/\?/, '')}`;
    }
    return search;
}
