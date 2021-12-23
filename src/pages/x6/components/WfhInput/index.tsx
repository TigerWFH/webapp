import * as React from 'react';
import { Card, Form, Input, Select, InputNumber } from 'antd';

interface IInput {
  id: React.ReactText;
  componentType: string;
  label: string;
  param: string;
  holder?: string;
  required?: any;
  length?: number;
}

export function WfhInput(props: IInput) {
  console.log('WfhInput====>', props);
  const {
    label,
    param,
    required = {},
    length = Number.MAX_SAFE_INTEGER,
    holder = undefined
  } = props;
  return (
    <Form.Item
      label={label}
      name={param ? param : 'name'}
      rules={[
        {
          required: required.value === '是',
          message: `${label}是必填字段`
        }
      ]}>
      <Input maxLength={length} placeholder={holder} />
    </Form.Item>
  );
}

WfhInput.thumbnail = '单行文本';
WfhInput.componentType = 'wfhinput';
WfhInput.title = '单行文本';

const YES_OR_NO = [
  {
    label: '是',
    value: '是'
  },
  {
    label: '否',
    value: '否'
  }
];

const CONFIG_LABELS = {
  title: 'WfhInput组件属性',
  base: '基础属性',
  label: '标题',
  labelHolder: '请输入标题',
  param: '对应入参',
  paramHolder: '请选择对应入参',
  holder: '占位提示',
  holderHolder: '请输入占位提示',
  spec: '校验属性',
  required: '必填',
  requiredHolder: '请选择是否必填',
  maxlength: '最大长度',
  maxlengthHolder: '请输入最大长度'
};

/*
    Config必须实现内容：
    1、将当前form实例透传给父组件，用于校验
    2、使用受控组件，做实时预览
  */
function Config(props: any, ref: any) {
  const [form] = Form.useForm();
  React.useImperativeHandle(ref, () => ({
    form: form
  }));
  const [paramList, setParam] = React.useState([] as any);
  React.useEffect(() => {
    setTimeout(() => {
      const paramList: any[] = [
        {
          label: 'uid',
          value: 'uid',
          other: '1'
        },
        {
          label: 'name',
          value: 'name',
          other: '2'
        },
        {
          label: 'age',
          value: 'age',
          other: '3'
        }
      ];
      setParam(paramList);
    }, 1000);
  }, []);
  const { config, setConfig, componentType } = props;
  if (componentType !== WfhInput.componentType) {
    return null;
  }
  const fields = Object.keys(config).reduce((prev: any[], curr) => {
    const tmp = {
      name: [curr],
      value: config[curr]
    };

    prev.push(tmp);

    return prev;
  }, []);

  function onValuesChange(changedValue: any, allVAlues: any) {
    const key = Object.keys(changedValue)[0];
    setConfig(key, changedValue[key]);
  }
  return (
    <Form
      fields={fields}
      form={form}
      onValuesChange={onValuesChange}
      labelCol={{ span: 6 }}>
      <Card title={CONFIG_LABELS.title}>
        <h3>{CONFIG_LABELS.base}</h3>
        <Form.Item
          label={CONFIG_LABELS.label}
          name="label"
          rules={[{ required: true, message: CONFIG_LABELS.labelHolder }]}>
          <Input maxLength={10} placeholder={CONFIG_LABELS.labelHolder} />
        </Form.Item>
        <Form.Item
          label={CONFIG_LABELS.param}
          name="param"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.paramHolder
            }
          ]}>
          <Select labelInValue placeholder={CONFIG_LABELS.paramHolder}>
            {paramList.map((param: any) => (
              <Select.Option key={param.value} value={param.value}>
                {param.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={CONFIG_LABELS.holder} name="holder">
          <Input maxLength={20} placeholder={CONFIG_LABELS.holderHolder} />
        </Form.Item>
        <h3>{CONFIG_LABELS.spec}</h3>
        <Form.Item label={CONFIG_LABELS.required} name="required">
          <Select labelInValue placeholder={CONFIG_LABELS.requiredHolder}>
            {YES_OR_NO.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={CONFIG_LABELS.maxlength} name="length">
          <InputNumber min={0} placeholder={CONFIG_LABELS.maxlengthHolder} />
        </Form.Item>
      </Card>
    </Form>
  );
}

export const WfhInputConfig = React.forwardRef(Config);
