import * as React from 'react';
import styles from './index.module.scss';

interface IProps { }
interface IState {
    code?: string;
}
interface IItem {
    platform: string;/* 平台 */
    font: string;/* 字体名称 */
    class: string;/* 对应的class名称 */
    fontSize: number;
    em: number;/* 字体参数1 */
    ascent: number;/* 字体参数2 */
    descent: number;/* 字体参数3 */
    gap: number; /* 行间距 */
    result: number;/* 计算渲染结果 */
    content: string;/* 中文或西文字符*/
}

const MAC_DATA_ZN_CH: Array<IItem> = [
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc1",
        fontSize: 19,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 26,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc2",
        fontSize: 40,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 56,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc3",
        fontSize: 17,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 24,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc4",
        fontSize: 15,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 21,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc5",
        fontSize: 13,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 18,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc6",
        fontSize: 20,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 28,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc7",
        fontSize: 18,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 25,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc8",
        fontSize: 23,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 32,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'mac',
        font: "Pingfang SC(Mac)",
        class: "pingfangsc9",
        fontSize: 30,
        em: 1000,
        ascent: 1060,
        descent: -340,
        gap: 30,
        result: 42,
        content: "我们是共产主义接班人，"
    }
];

const MAC_DATA_EN = [
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica0",
        fontSize: 14,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 16,
        content: "I am a student from Pingan Health Internet Componeny from Shanghai China"
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica1",
        fontSize: 15,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 17,
        content: "I am a student from Pingan Health Internet Componeny from Shanghai China"
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica2",
        fontSize: 22,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 25,
        content: "I am a student from Pingan Health Internet Componeny from Shanghai China"
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica3",
        fontSize: 16,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 18,
        content: "I am a student from Pingan Health Internet Componeny from Shanghai China"
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica4",
        fontSize: 17,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 20,
        content: "I am a student from Pingan Health Internet Componeny"
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica5",
        fontSize: 24,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 28,
        content: "I am a student from Pingan Health"
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica6",
        fontSize: 18,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 21,
        content: "I am a student from "
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica7",
        fontSize: 19,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 22,
        content: "I am a student from "
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica8",
        fontSize: 33,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 38,
        content: "I am a student from "
    },
    {
        platform: 'mac',
        font: "Helvetica(Mac)",
        class: "helvetica9",
        fontSize: 20,
        em: 2048,
        ascent: 1900,
        descent: -447,
        gap: 8,
        result: 23,
        content: "I am a student from "
    }
];

const DEMO_DATA: Array<IItem> = [
    {
        platform: 'window',
        font: "Microsoft Yahei(Window)",
        class: "MicrosoftYahei",
        fontSize: 14,
        em: 2048,
        ascent: 2167,
        descent: 536,
        gap: 0,
        result: 19,
        content: "我们是共产主义接班人，"
    },
    {
        platform: 'window',
        font: "Arial(Window)",
        class: "Arial",
        fontSize: 14,
        em: 2048,
        ascent: 1854,
        gap: 0,
        descent: 434,
        result: 16,
        content: "I am a student from Pingan Health Internet Componeny from Shanghai China"
    }
];

const TEST_LABEL = '测试';
const RUN_LABEL = '运行';
const CLEAR_LABEL = '清空';

class Font extends React.Component<IProps, IState>{
    demoFont: any;
    constructor(props: IProps) {
        super(props);
        this.demoFont = null;
        this.state = {
            code: undefined
        }
    }
    componentWillUnmount() {
        if (this.demoFont) {
            document.head.removeChild(this.demoFont);
            this.demoFont = null;
        }
    }
    onRun = () => {
        if (!this.demoFont) {
            this.demoFont = document.createElement('style');
            document.head.appendChild(this.demoFont);
        }
        // 将样式插入head
        let code = this.state.code || '';
        code = code.replace(/[\r\n]/g, '');
        let position = this.demoFont.sheet.cssRules.length;
        this.demoFont.sheet.insertRule(`.demoFont{${code}}`, position);
    }

    onClear = () => {
        if (this.demoFont) {
            document.head.removeChild(this.demoFont);
            this.demoFont = null;
        }
        this.setState({
            code: ''
        });
    }

    onCode = (e: any) => {
        this.setState({
            code: e.target.value
        });
    }

    renderDemo = (item:IItem, index: number, hasGap: boolean) => {
        return (
            <fieldset key={index}
                className={styles.field}>
                <legend className={styles.legend}>
                    {
                        `${item.font}参数以及测试结果`
                    }
                </legend>
                <div className={`flex ${styles.demo}`}>
                    <span className={`flex-1 ${styles[item.class]}`}>
                        <div>
                            {
                                `${item.content}${item.content}${item.result}*n`
                            }
                        </div>
                        <div>
                            {
                                `${item.content}${item.result}`
                            }
                        </div>
                    </span>
                    <span className={`flex-1`}>
                        <div>
                            <span className={styles.label}>
                                平台：
                            </span>
                            <span className={styles.result}>
                                {
                                    item.platform
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                测试字体：
                            </span>
                            <span className={styles.result}>
                                {
                                    item.font
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                font-size:
                            </span>
                            <span className={styles.result}>
                                {
                                    item.fontSize
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                em:
                            </span>
                            <span className={styles.result}>
                                {
                                    item.em
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                ascnet:
                            </span>
                            <span className={styles.result}>
                                {
                                    item.ascent
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                descnet:
                            </span>
                            <span className={styles.result}>
                                {
                                    item.descent
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                gap:
                            </span>
                            <span className={styles.result}>
                                {
                                    item.gap
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                计算实际尺寸(px,widnow平台是Math.ceil,Mac平台是Math.round):
                            </span>
                            <span className={styles.result}>
                                {
                                    ((item.ascent + Math.abs(item.descent) + (hasGap ? item.gap : 0)) / item.em * item.fontSize).toFixed(4)
                                }
                            </span>
                        </div>
                        <div>
                            <span className={styles.label}>
                                实际渲染尺寸(px):
                            </span>
                            <span className={styles.result}>
                                {
                                    item.result
                                }
                            </span>
                        </div>
                    </span>
                </div>
            </fieldset>
        )
    }

    render() {
        return (
            <div className={styles.font}>
                <fieldset className={styles.field}>
                    <legend className={styles.legend}>
                        {
                            TEST_LABEL
                        }
                    </legend>
                    <button onClick={this.onRun}>
                        {
                            RUN_LABEL
                        }
                    </button>
                    <button onClick={this.onClear}>
                        {
                            CLEAR_LABEL
                        }
                    </button>
                    <div className={`flex flex-evenly ${styles.container}`}>
                        <span className={`flex flex-1 ${styles.half}`}>
                            <textarea className={`flex-1 ${styles.textarea}`}
                                onChange={this.onCode}
                                value={this.state.code} />
                        </span>
                        <span className={'flex-1 flex-center'}>
                            <div className={'demoFont'}>
                                测试数据
                            </div>
                        </span>
                    </div>
                </fieldset>
                <fieldset className={styles.window}>
                    <legend className={styles.legend}>
                        Window平台测试数据
                    </legend>
                    <div className={'flex'}>
                        <div className={'flex-3'}>
                            {
                                DEMO_DATA.map((item: IItem, index: number) => this.renderDemo(item, index, false))
                            }
                        </div>
                        <div className={'flex-1'}>
                            结论：中英文都是Math.ceil
                        </div>
                    </div>
                </fieldset>
                <fieldset className={styles.mac}>
                    <legend className={styles.legend}>
                        Mac平台中文测试数据
                    </legend>
                    <div className={'flex'}>
                        <div className={'flex-3'}>
                            {
                                MAC_DATA_ZN_CH.map((item: IItem, index: number) => this.renderDemo(item, index, false))
                            }
                        </div>
                        <div className={'flex-1'}>
                            结论：中文字体计算大体上和西文一致，不包括gap，但是存在个别不是Math.round而是Math.floor
                        </div>
                    </div>
                </fieldset>
                <fieldset className={styles.mac}>
                    <legend className={styles.legend}>
                        Mac平台西文测试数据
                    </legend>
                    <div className={'flex'}>
                        <div className={'flex-3'}>
                            {
                                MAC_DATA_EN.map((item: IItem, index: number) => this.renderDemo(item, index, true))
                            }
                        </div>
                        <div className={'flex-1'}>
                            结论：西文字体计算方式Math.round((ascent + Math.abs(descent) + gap) / em * fontSize)
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default Font;