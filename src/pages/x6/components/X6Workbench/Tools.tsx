import React from 'react';
import ReactDom from 'react-dom';
import { Dropdown, Menu } from 'antd';
import { ToolsView, EdgeView } from '@antv/x6';

interface ContextMenuToolOptions extends ToolsView.ToolItem.Options {
  //   menu: React.ReactElement;
  //   graph: Graph;
}

export class ContextMenuTool extends ToolsView.ToolItem<
  EdgeView,
  ContextMenuToolOptions
> {
  private knob: HTMLDivElement | undefined;
  private timer: number | undefined;
  private contextMenu: any;

  render() {
    if (!this.knob) {
      this.knob = ToolsView.createElement('div', false) as HTMLDivElement;
      this.knob.style.position = 'absolute';
      this.container.appendChild(this.knob);
    }

    return this;
  }

  onMenu = (arg: any) => {
    console.log('arg====>', arg, this);
    const { cell } = this.contextMenu;
    console.log('=====>cell=====>', cell.shape);
    const { key } = arg;
    if (key === '1') {
      const { edge } = this.contextMenu;
      const source = edge.getSource();
      const target = edge.getTarget();
      console.log('copy edge source and target=======>', source, target);

      //   获取边的起始节点

      this.graph?.addEdge({
        target: { x: 80, y: 50 },
        source: { x: 100, y: 50 },
        tools: [
          {
            name: 'contextmenu',
            args: {
              graph: this.graph
            }
          }
        ]
      });
    }
    // 在这里处理业务逻辑，但是不同的业务节点可能逻辑不同
  };

  renderMenu() {
    return (
      <Menu onClick={this.onMenu}>
        <Menu.Item key="1">复制</Menu.Item>
        <Menu.Item key="2">2</Menu.Item>
        <Menu.Item key="3">3</Menu.Item>
      </Menu>
    );
  }

  private toggleContextMenu(visible: boolean) {
    ReactDom.unmountComponentAtNode(this.knob as HTMLDivElement);
    document.removeEventListener('mousedown', this.onMouseDown);

    if (visible) {
      ReactDom.render(
        <Dropdown
          visible={true}
          trigger={['contextMenu']}
          overlay={this.renderMenu()}>
          <a />
        </Dropdown>,
        this.knob as HTMLDivElement
      );
      document.addEventListener('mousedown', this.onMouseDown);
    }
  }

  private updatePosition(e?: MouseEvent) {
    const style = this.knob?.style || ({} as any);
    if (e) {
      const pos = this.graph.clientToGraph(e.clientX, e.clientY);
      style.left = `${pos.x}px`;
      style.top = `${pos.y}px`;
    } else {
      style.left = '-1000px';
      style.top = '-1000px';
    }
  }

  private onMouseDown = () => {
    this.timer = window.setTimeout(() => {
      this.updatePosition();
      this.toggleContextMenu(false);
    }, 200);
  };

  private onContextMenu({ e, ...rest }: { e: MouseEvent }) {
    // 拿到当前节点信息
    this.contextMenu = rest;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    }

    this.updatePosition(e);
    this.toggleContextMenu(true);
  }

  delegateEvents() {
    //   注册监听事件
    this.cellView.on('cell:contextmenu', this.onContextMenu, this);
    return super.delegateEvents();
  }

  protected onRemove() {
    this.cellView.off('cell:contextmenu', this.onContextMenu, this);
  }
}

ContextMenuTool.config({
  tagName: 'div',
  isSVGElement: false
});
