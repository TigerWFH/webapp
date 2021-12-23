// import { gateway } from '@/utils/gateway';

// // UI渲染测试接口
// export function getCard() {
//     return gateway('/card', 'GET');
// }
// export function getCard2() {
//     return gateway('/card2', 'GET');
// }
// export function getAuthor(){
//     return gateway('http://localhost:3003/author', 'GET');
// }

// export function getArticleList(){
//     return gateway('/articleList', 'GET');
// }

// export function getUser() {
//     let url = '/v1/user';
//     return gateway(url, 'GET');
// }

// export function getTimeout() {
//     let url = '/v1/timeout';
//     return gateway(url, 'POST', {name: "monkey"});
// }
// // request payload形式
// export function getApis() {
//     const data = {
//         _chl: 'IOS | Android',
//         _mt: 'megrez.queryList',
//         _sm: 'md5',
//         _sig: 'xxxxxxx'
//     }
//     return gateway('/m.api', 'POST', data, {
//         'Content-Type': 'text/plain; charset=UTF-8'/* 默认值 */
//     });
// }

// export function getApi() {
//     const params = `${encodeURIComponent('_chl')}=${encodeURIComponent('IOS | Android')}&${encodeURIComponent('_mt')}=${encodeURIComponent('megrez.queryList')}&${encodeURIComponent('_sm')}=${encodeURIComponent('md5')}&${encodeURIComponent('_sig')}=${encodeURIComponent('XXXXX')}`;
//     return gateway('/m.api', 'POST', params, {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     });
// }