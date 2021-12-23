import * as React from 'react';
import { Card, Form, Input, Select } from 'antd';

interface ISelect {
  id: React.ReactText;
  componentType: string;
  text: string;
}

export function WfhSelect(props: ISelect) {
  const { text } = props;
  return <div>{text}</div>;
}

WfhSelect.thumbnail = '下拉框';
WfhSelect.componentType = 'wfhselect';
WfhSelect.title = '下拉框';

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
  title: 'WfhSelect组件属性',
  base: '基础属性', //基础属性域
  label: '标题',
  labelHolder: '请输入标题',
  param: '对应入参',
  paramHolder: '请选择对应入参',
  holder: '占位提示',
  holderHolder: '请输入占位提示',
  search: '搜索',
  searchHolder: '请配置是否支持搜索',
  spec: '校验属性', //校验属性域
  required: '是否必填',
  requiredHolder: '请选择是否必填',
  option: '选项属性', //选项属性域
  source: '数据源',
  sourceHolder: '请输入数据源',
  select: '选项字段',
  selectHolder: '请配置选项字段',
  inparam: '入参字段',
  inparamHolder: '请配置入参字段',
  type: '选项类型',
  typeHolder: '请配置选项类型',
  remote: '远程数据源',
  remoteHolder: '请配置远程数据源',
  multiple: '是否多选',
  multipleHolder: '请配置是否支持多选'
};
export function Config(props: any, ref: any) {
  const [form] = Form.useForm();
  React.useImperativeHandle(ref, () => ({
    form
  }));
  const onValuesChange = React.useCallback(
    (changedValue: any, allValues: any) => {
      const key = Object.keys(changedValue)[0];
      setConfig(key, changedValue[key]);
    },
    []
  );
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
  const { text, setConfig, componentType } = props;
  if (componentType !== WfhSelect.componentType) {
    return null;
  }

  return (
    <Form onValuesChange={onValuesChange} labelCol={{ span: 6 }}>
      <Card title={CONFIG_LABELS.title}>
        <h3>{CONFIG_LABELS.base}</h3>
        <Form.Item
          label={CONFIG_LABELS.label}
          name="label"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.multipleHolder
            }
          ]}>
          <Input maxLength={10} placeholder={CONFIG_LABELS.labelHolder} />
        </Form.Item>
        <Form.Item
          label={CONFIG_LABELS.param}
          name="param"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.multipleHolder
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
        <Form.Item label={CONFIG_LABELS.search}>
          <Select
            labelInValue
            placeholder={CONFIG_LABELS.searchHolder}></Select>
        </Form.Item>
        <h3>{CONFIG_LABELS.spec}</h3>
        <Form.Item
          label={CONFIG_LABELS.source}
          name="source"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.sourceHolder
            }
          ]}>
          <Input placeholder={CONFIG_LABELS.sourceHolder} />
        </Form.Item>
        <Form.Item
          label={CONFIG_LABELS.select}
          name="select"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.selectHolder
            }
          ]}>
          <Input placeholder={CONFIG_LABELS.selectHolder} />
        </Form.Item>
        <Form.Item
          label={CONFIG_LABELS.inparam}
          name="inparam"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.inparamHolder
            }
          ]}>
          <Input placeholder={CONFIG_LABELS.inparamHolder} />
        </Form.Item>
        <Form.Item label={CONFIG_LABELS.multiple} name="multipe">
          <Select labelInValue placeholder={CONFIG_LABELS.multipleHolder}>
            {YES_OR_NO.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <h3>{CONFIG_LABELS.spec}</h3>
        <Form.Item
          label={CONFIG_LABELS.required}
          name="required"
          rules={[
            {
              required: true,
              message: CONFIG_LABELS.requiredHolder
            }
          ]}>
          <Select labelInValue placeholder={CONFIG_LABELS.requiredHolder}>
            {YES_OR_NO.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Form>
  );
}

export const WfhSelectConfig = React.forwardRef(Config);
