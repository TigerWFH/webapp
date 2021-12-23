// import * as React from 'react';
// import { Form, Col, Row, Input, Card } from 'antd';
// import FormComponentProps from 'antd/lib/form';
// // import hoistNonReactStatics from 'hoist-non-react-statics';
// // import anymatch from 'anymatch';

// interface IProps extends FormComponentProps {
//   child: string;
//   onSubmit?: any;
// }
// interface IState {
//   child: string;
// }
// class Child extends React.Component<IProps, IState> {
//   static getDerivedStateFromProps(props: IProps, state: IState) {
//     console.log('child====>props====>', props);
//     return null;
//   }
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       child: 'child'
//     };
//   }

//   componentDidMount() {
//     const { onSubmit } = this.props;
//     const { validateFields } = this.props.form;
//     if (typeof onSubmit === 'function') {
//       onSubmit(validateFields);
//     }
//   }

//   onClick = () => {
//     this.setState({
//       child: 'child change child'
//     });
//   };
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div>
//         <button onClick={this.onClick}>change child child</button>
//         {this.state.child}
//         <Card title="child form">
//           <Form>
//             <Row>
//               <Col span={8}>
//                 <Form.Item label="姓名">
//                   {getFieldDecorator('name', {
//                     rules: [
//                       {
//                         required: true,
//                         message: '不能为空'
//                       }
//                     ]
//                   })(<Input placeholder="please input name" />)}
//                 </Form.Item>
//               </Col>
//               <Col span={16}>
//                 <Form.Item label="年龄">
//                   {getFieldDecorator('age', {
//                     rules: [
//                       {
//                         required: true,
//                         message: '不能为空'
//                       }
//                     ]
//                   })(<Input placeholder="please input age" />)}
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </Card>
//       </div>
//     );
//   }
// }

// export default Form.create<IProps>()(Child);
