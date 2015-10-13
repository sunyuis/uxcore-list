import Button from 'uxcore-button';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

export default function (props) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    let d;
    props = props || {};
    props.iconClassName = props.iconClassName || 'kuma-icon-caution';
    let width = props.width || 416;

    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
        props.okCancel = true;
    }

    function close() {
        d.setState({
            visible: false
        });
        ReactDOM.unmountComponentAtNode(div);
    }

    function onCancel() {
        let cancelFn = props.onCancel;
        if (cancelFn) {
            let ret;
            if (cancelFn.length) {
                ret = cancelFn(close);
            } else {
                ret = cancelFn();
                if (!ret) {
                    close();
                }
            }
            if (ret && ret.then) {
                ret.then(close);
            }
        } else {
            close();
        }
    }

    function onOk() {
        let okFn = props.onOk;
        if (okFn) {
            let ret;
            if (okFn.length) {
                ret = okFn(close);
            } else {
                ret = okFn();
                if (!ret) {
                    close();
                }
            }
            if (ret && ret.then) {
                ret.then(close);
            }
        } else {
            close();
        }
    }

    let body = <div className="kuma-confirm-body">
        <i className={'kuma-icon ' + props.iconClassName}></i>
        <span className="kuma-confirm-title">{props.title}</span>
        <div className="kuma-confirm-content">{props.content}</div>
    </div>;
    let footer;

    if (props.okCancel) {
        footer = <div className="kuma-confirm-action">
            <Button size="small" onClick={onOk}>确 定</Button>
            <Button type="secondary" size="small" onClick={onCancel}>取 消</Button>
        </div>;
    } else {
        footer = <div className="kuma-confirm-action">
            <Button size="small" onClick={onOk}>知道了</Button>
        </div>;
    }

    ReactDOM.render(<Dialog
        prefixCls="kuma-dialog"
        className="kuma-dialog-confirm"
        visible={true}
        closable={false}
        title=""
        transitionName="zoom"
        footer=""
        maskTransitionName="fade" width={width}>
        <div>{body} {footer}</div>
    </Dialog>, div, function () {
        d = this;
    });
}