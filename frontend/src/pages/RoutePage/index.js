import React from 'react';
import { Menu, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import AdministratorPage from '../AdministratorPage';
import CustomerPage from '../CustomerPage';
import ReceptionPage from '../ReceptionPage';
import ManagerPage from '../ManagerPage';
import './index.css'

class RoutePage extends React.Component {
    state = {
        current: 'customer',
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Router style={{ alignItems: 'center' }}>
                <Row className="header-style">
                    <Col span={8} >
                        <a href="/" className="title-style">
                            <img
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                className="img-icon-style"
                            />
                            空调管理系统
                        </a>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={7}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            forceSubMenuRender
                        >
                            <Menu.Item key="customer" className="menu-item-style">
                                <Link to="/customer">顾客</Link>
                            </Menu.Item>
                            <Menu.Item key="administrator" className="menu-item-style">
                                <Link to="/administrator">管理员</Link>
                            </Menu.Item>
                            <Menu.Item key="reception" className="menu-item-style">
                                <Link to="/reception">前台</Link>
                            </Menu.Item>
                            <Menu.Item key="manager" className="menu-item-style">
                                <Link to="/manager">经理</Link>
                            </Menu.Item>
                        </Menu>

                    </Col>
                    <Col span={1}>
                        <a
                            href="https://github.com/zza1999/Software-Engineering"
                            className="github-icon-style"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubOutlined style={{ fontSize: 20 }} />
                        </a>
                    </Col>
                </Row>
                <div>
                    <Route exact path="/" component={CustomerPage} />
                    <Route path="/administrator" component={AdministratorPage} />
                    <Route path="/customer" component={CustomerPage} />
                    <Route path="/reception" component={ReceptionPage} />
                    <Route path="/manager" component={ManagerPage} />
                </div>
            </Router>
        );
    }
}

export default RoutePage;