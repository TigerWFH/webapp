# React-Router

## 术语(Definitions)

[react-router 核心概念](https://github.com/remix-run/react-router/blob/main/docs/start/concepts.md)

- `URL：`地址栏的地址即为 URL
- `Location：`基于浏览器 window.location 封装的 ReactRouter 对象，标识的用户的位置。一般就是包含了 URL 以及其他信息的对象
  - `https://example.com/teams/hotspurs?a=123&b=456`
  - `pathname`: Location Pathname
  - `search`: Location Search(别名：search params, URL search params, query string)
  - `hash`: Location Hash
  - `state`: Location State
  - `key`: Location Key,Each location gets a unique key
- `Location State：`
- `History Stack：`
- `Client Side Routing(CSR)：`
- `History：`
- `History Action：`POP、PUSHState、REPLACE
- `Segment：`The parts of a URL or path pattern between the / characters. For example, "/users/123" has two segments.
- `Path Pattern：`These look like URLs but can have special characters for matching URLs to routes, like dynamic segments("/users/:userId") or star segments ("/docs/\*")
- `Dynamic Segment：`A segment of a path pattern that is dynamic, meaning it can match any values in the segment.
- `URL Params：`Dynamic Segment 实际匹配值为 URL Params 或 Match Params
- `router：`路由器，Stateful, top-level component that makes all the other components and hooks work
- `Route Config：`
- `route：`路线，An object or Route Element typically with a shape of { path, element } or <Route path element>. The path is a path pattern. When the path pattern matches the current URL, the element will be rendered.
- `Route Element`
- `Nested Routes`
- `Relative links`
- `Match：`An object that holds information when a route matches the URL, like the url params and pathname that matched.
  - `Match Params`
- `Matches`
- `Parent Route`
- `Outlet：`A component that renders the next match in a set of matches
- `Index Route：`
- `Layout Route：`
- `Navigation：`When the URL changes we call that a "navigation". There are two ways to navigate in React Router:
  - `Link`
  - `navigate`

## APIs

- `RouterProvider：`All router objects are passed to this component to render your app and enable the rest of the APIs
- `loader：`Each route can define a "loader" function to provide data to the route element before it renders. This feature only works if using a data router, see Picking a Router

### Router

> 路由器，一切功能的基础

- `createMemoryRouter：`@v6.4 支持 data APIs，可以使用 loader
- `createBrowserRouter：`@v6.4 支持 data APIs，可以使用 loader
- `createHashRouter：`@v6.4 支持 data APIs，可以使用 loader
- `Router：`不再使用
- `MemoryRouter`不支持 data APIs
- `BrowserRouter`不支持 data APIs
- `HashRouter`不支持 data APIs
- `NativeRouter`不支持 data APIs
- `StaticRouter`不支持 data APIs

```javascript
import {
  createMemoryRouter,
  createBrowserRouter,
  createHashRouter,
  RouterProvider
} from 'react-router-dom';

const routes = [
  {
    path: '/events/:id',
    element: <CalendarEvent />,
    loader: () => FAKE_EVENT
  }
];
const memoryRouter = createMemoryRouter(routes, {
  initialEntries: ['/', '/events/123'],
  initialIndex: 1
});

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: ({ params, request }) => {
      // params就是URL Params
      //   request接口，封装了一些请求内容
      return {};
    },
    children: [
      {
        path: 'team',
        element: <Team />,
        loader: teamLoader
      }
    ]
  }
]);

const hashRouter = createHashRouter([
  {
    path: '/',
    element: <div />,
    loader: rootLoader,
    children: [
      {
        path: 'team',
        element: <div />,
        loader: ''
      }
    ]
  }
]);

<RouterProvider router={hashRouter} fallbackElement={<SpinnerOfDoom />} />;
```
