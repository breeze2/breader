import { Layout } from 'antd';
import React, { Component } from 'react';
// import Menu from '../components/Menu';
import Menu from '../containers/Menu';
import '../styles/Sider.less';
import List from './List';

const LayoutSider = Layout.Sider;

class Sider extends Component {
    public render() {
        return (
            <LayoutSider className="app-sider" width="490">
                <Menu />
                <List />
            </LayoutSider>
        );
    }
}

export default Sider;
