const prefix = 'HOME/';

// 接口状态
export enum API_STATUS {
    INITIAL = 0,
    SUCCESS = 1,
    FAILURE = 2
} 

export const CHANGE_COUNT = prefix + 'CHANGE_COUNT';
// getAuthor接口
export const GET_AUTHOR = Symbol(`${prefix}GET_AUTHOR`);
export const GET_AUTHOR_SUCCESS = Symbol(`${prefix}GET_AUTHOR_SUCCESS`);
export const GET_AUTHOR_FAILURE = Symbol(`${prefix}GET_AUTHOR_FAILURE`);
// getArticleList接口
export const GET_ARTICLE_LIST = Symbol(`${prefix}GET_AUTHOR`);
export const GET_ARTICLE_LIST_SUCCESS = Symbol(`${prefix}GET_ARTICLE_LIST_SUCCESS`);
export const GET_ARTICLE_LIST_FAILURE = Symbol(`${prefix}GET_ARTICLE_LIST_FAILURE`);