import * as React from 'react';
import { connect } from 'react-redux';
import Card from "Components/Card"
import Portal from 'Components/Portal';
import Carousel from "Components/Carousel"
import Swiper from "Components/Swiper"
import Banner from "Components/Banner"
import Navigation from "Components/Navigation"
import Loading, { LoadingV2 } from 'Components/Loading';
import Modal from 'Components/Modal';
import Text from 'Components/Text';
import Line from 'Components/Line';
import IconFont from 'Components/IconFont';
import Compare from './components/Modal'
import actions from './controller/actions';
import styles from './index.module.scss';
import { ThemeContext } from '@/context'
import Toast from '@/components/Toast';

function Button() {
    console.log('render-button')
    return (
        <ThemeContext.Consumer>
            {
                theme => theme
            }
        </ThemeContext.Consumer>
    )
}

interface IHomeState {
    monkey: any;
    count: number;
    name: string;
    age: number | undefined;
    bPortal: boolean
}

class Home extends React.Component<any, IHomeState> {
    // static contextType = ThemeContext
    static getDerivedStateFromProps(props: any, state: any) {
        return {
            monkey: {
                info: {
                    name: 'cat'
                }
            },
            cat: {
                name: 'cat'
            }
        };
    }
    constructor(props: any) {
        super(props);
        this.state = {
            monkey: {
                info: {
                    name: 'monkey',
                    age: 12
                }
            },
            count: 20,
            name: "",
            age: undefined,
            bPortal: false
        }
    }

    componentDidMount() {
        this.getAuthor();
    }
    componentWillUnmount() {
        console.log("Home unmount===========>")
    }
    getAuthor = () => {
        return actions.requestGetAuthor({
            pageNo: 1,
            pageSize: 1
        })
    }

    onRequest = () => {
        this.getAuthor();
    }


    reCall = () => {
        // mock.getUser().then((data: any) => {
        //     console.log("data===>", data);
        // }).catch((err: any) => {
        //     console.log("err===>", err)
        // });
    }

    onToApp = () => {
        window.location.href = '#/blog?app=&outBizType=';
    }

    onToMiddle = () => {
        window.location.href = '#/middle';
    }
    onChangeAge = () => {
        const { monkey } = this.state;
        console.log("monkey===monkey", monkey === this.state.monkey);
        this.setState({
            monkey
        }, () => {
            console.log("changedState===>", this.state.monkey);
        });
    }

    onPortal = () => {
        this.setState({
            bPortal: true
        })
    }
    onClosePortal = () => {
        this.setState({
            bPortal: false
        })
    }
    onPortalV2 = (e: any) => {
        e.stopPropagation()
    }
    onLoading = () => {
        Loading.mount()
    }
    onLoadingV2 = () => {
        LoadingV2.mount()
    }
    onToast = () => {
        Toast.mount({
            message: "Toast test demo"
        })
    }
    onModal = () => {
        Modal.mount({
            header: 'monkey?????????',
            content: 'XKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflasklXKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflasklXKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflasklXKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflasklXKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflasklXKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflasklXKJjkdjajksadjkksjajfsnsknsaklnfdlksamfklmalkmdslkfmkaslmfklasmfklamflsalfanflkasdkflaskl'
        });
    }
    onToJs = () => {
        window.location.href = 'http://localhost:8080/demo.html'
    }
    onToBaidu = () => {
        window.location.href = 'https://www.baidu.com';
    }
    onName = (e: any) => {

    }
    onAge = (e: any) => {

    }
    renderCarouselBanner = () => {
        const { bannerList = [] } = this.props
        if (bannerList.length <= 0) {
            return null
        }

        return (
            <Carousel autoPlay={true}
                dotType="bottom">
                {
                    bannerList.map((metadata: any) => {
                        return (
                            <div key={metadata.key}>
                                <img width={"100%"} src={metadata.image} alt="" />
                            </div>
                        )
                    })
                }
            </Carousel>
        )
    }
    renderSwiperBanner = () => {
        const { bannerList = [] } = this.props
        if (bannerList.length <= 0) {
            return null
        }

        return (
            <Swiper autoPlay={true}
                showDotFlag="bottom">
                {
                    bannerList.map((metadata: any) => {
                        return (
                            <div key={metadata.key}>
                                <img width={"100%"} src={metadata.image} alt="" />
                            </div>
                        )
                    })
                }
            </Swiper>
        )
    }
    onToAnimation = () => {
        const { history } = this.props
        history.push("/animation")
    }
    render() {
        return (
            <div className={styles.home}>
                <button onClick={this.onToAnimation}>
                    toAnimation
                </button>
                <Card title="CarouselBanner">
                    {
                        this.renderCarouselBanner()
                    }
                </Card>
                <Card title="Swiper">
                    {
                        this.renderSwiperBanner()
                    }
                    <Banner />
                    <Navigation />
                </Card>
                <Card title="Portal????????????">
                    <Portal onClose={this.onClosePortal}
                        bMaskClose={true}
                        show={this.state.bPortal}>
                        <div className={styles.portal}
                            onClick={this.onPortal}>
                            66666
                            </div>
                    </Portal>
                </Card>
                <Card title="Text????????????">
                    <div>
                        <div className={styles.zone}>
                            <Text numberOfLines={1}>
                                asjkasdjkfnsaknjfdkjsanfksanfksanx,mznkasnfknafksanfsanfd,msa fm amsdasjkasdjkfnsaknjfdkjsanfksanfksanx,mznkasnfknafksanfsanfd,msa fm amsdasjkasdjkfnsaknjfdkjsanfksanfksanx,mznkasnfknafksanfsanfd,msa fm amsd
                            </Text>
                            <Line />
                            <Text>
                                asjkasdjkfnsaknjfdkjsanfksanfksanx,mznkasnfknafksanfsanfd,msa fm amsdasjkasdjkfnsaknjfdkjsanfksanfksanx,mznkasnfknafksanfsanfd,msa fm amsdasjkasdjkfnsaknjfdkjsanfksanfksanx,mznkasnfknafksanfsanfd,msa fm amsd
                            </Text>
                        </div>
                        <div className={styles.demo}>
                            <Text>
                                1232133
                            </Text>
                            <Line />
                        </div>
                    </div>
                </Card>
                <Card title="IconFont??????">
                    <div className={styles.zone}>
                        <span>
                            <IconFont icon='downArrow' />
                            ????????????
                        </span>
                        <span>
                            <IconFont icon='share' />
                            ??????
                        </span>
                    </div>
                </Card>
                <Card title="????????????">
                    <div>
                        <Button />
                        <div className={styles.zone}>
                            <Compare />
                        </div>
                        <div className={styles.zone}>
                            <Line />
                        </div>
                        <div>
                            <div className={styles.zone}>
                                <form action='/m.api' method='GET'>
                                    <input name='name' />
                                    <input name='age' />
                                    <input type='submit' />
                                </form>
                            </div>
                        </div>
                        <div className={styles.zone}>
                            <button onClick={this.onLoading}>Loading(ReactTree)</button>
                            <button onClick={this.onLoadingV2}>LoadingV2(ReactTree)</button>
                            <button onClick={this.onToast}>Toast(ReactTree)</button>
                            <button onClick={this.onRequest}>
                                ????????????
                            </button>
                            <button onClick={this.onPortal}>portal</button>
                            <button onClick={this.onModal}>Modal</button>
                            <button onClick={this.onToJs}>???JS?????????</button>
                            <button onClick={this.onToMiddle}>???????????????</button>
                            <button onClick={this.onChangeAge}>????????????</button>
                            <button onClick={this.reCall}>recall</button>
                            <button onClick={this.onToBaidu}>Baidu</button>
                        </div>
                        <div>
                            <span>?????????</span>
                            <span>
                                {this.state.monkey.info.name}
                            </span>
                        </div>
                        <div>
                            <span>?????????</span>
                            <span>
                                {
                                    this.state.monkey.info.age
                                }
                            </span>
                        </div>
                        <button onClick={this.onModal}>Modal</button>
                    </div>
                </Card>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    const { home } = state;
    return {
        ...home
    };
}
export default connect(mapStateToProps)(Home);