// console.log('process.cwd=====', process.cwd());
// console.log('__dirname', __dirname);
// console.log('__finename', __filename);

// const p = Promise.resolve(4);
// new Promise((resolve) => resolve(p))
//   .then(() => {
//     console.log(0);
//   })
//   .then((res) => {
//     console.log(res);
//   });
Promise.resolve()
  .then(() => {
    // then的解析过程应该是new Promise()
    console.log(0);
    // const p = Promise.resolve(4); // 0,1,2,3,4,5
    // return p;
    let thenable = {
      // 0,1,then,2,4,3,5
      then: function (resolve) {
        console.log('then');
        resolve(4);
      }
    };

    return thenable;
  })
  .then((res) => {
    console.log(res);
  });
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  });
