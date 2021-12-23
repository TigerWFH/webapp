// import * as React from 'react';
// import { Form, Input, Card } from 'antd';
// class FormComp extends React.Component<any, any> {
//   componentDidMount() {
//     const { onValidate } = this.props;
//     if (typeof onValidate === 'function') {
//       onValidate(this.props.form);
//     }
//   }
//   render() {
//     const { form } = this.props;
//     const { getFieldDecorator } = form;

//     return (
//       <Card title="FormComp">
//         <Form.Item label="name">
//           {getFieldDecorator('name', {
//             initialValue: 'monkey',
//             rules: [
//               {
//                 required: true,
//                 message: '姓名不可为空'
//               }
//             ]
//           })(<Input />)}
//         </Form.Item>
//       </Card>
//     );
//   }
// }

// export default Form.create()(FormComp);
