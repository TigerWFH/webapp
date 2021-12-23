// import * as React from 'react';
// import { Form, Input, Card } from 'antd';
// // import FormComponentProps from 'antd/lib/form';
// // import Child from '../Child';

// interface IDemoProps {
//   onSubmit: any;
//   form: any;
// }

// class Demo extends React.Component<IDemoProps, any> {
//   validate: any;
//   componentDidMount() {
//     const { validateFields } = this.props.form;
//     const { onSubmit } = this.props;
//     if (typeof onSubmit === 'function') {
//       onSubmit(validateFields, this.validate);
//     }
//   }
//   onSubmit = (fn: any) => {
//     this.validate = fn;
//   };
//   render() {
//     const { getFieldDecorator } = this.props.form;

//     return (
//       <Card title="child form">
//         {/* <Child onSubmit={this.onSubmit} child="form child" /> */}
//         <Form layout="inline">
//           <Form.Item label="姓名">
//             {getFieldDecorator('name', {
//               rules: [
//                 {
//                   message: '不能超出5个字符',
//                   required: true
//                 }
//               ]
//             })(<Input placeholder="please input name" />)}
//           </Form.Item>
//           <Form.Item label="年龄">
//             {getFieldDecorator('age', {
//               rules: [
//                 {
//                   message: '不能超出5个字符',
//                   required: true
//                 }
//               ]
//             })(<Input placeholder="please input age" />)}
//           </Form.Item>
//         </Form>
//       </Card>
//     );
//   }
// }

// export default Form.create<IDemoProps>()(Demo);
