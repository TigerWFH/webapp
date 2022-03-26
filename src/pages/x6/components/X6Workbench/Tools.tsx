import React from 'react';
import ReactDom from 'react-dom';
import { Dropdown, Menu } from 'antd';
import { ToolsView, EdgeView } from '@antv/x6';
import { Edge } from '@antv/x6';

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

  onMenu = (args: any) => {
    const { cell, edge } = this.contextMenu;
    const { key, domEvent } = args;
    if (key === '1') {
      const source = edge.getSourceNode();
      const target = edge.getTargetNode();
      const sourcePos = source?.position();
      const targetPos = target?.position();
      console.log('copy edge source and target=======>', source, target);
      const clone = edge.clone();
      // clone.disconnect({
      //   silent: true
      // });
      clone.setSource({
        x: sourcePos.x + 50,
        y: sourcePos.y + 50
      });
      clone.setTarget({
        x: targetPos.x + 50,
        y: targetPos.y + 50
      });
      console.log('origin======>', edge);
      console.log('clone=====>', clone);

      this.graph?.addEdge(clone);

      //   获取边的起始节点
      // this.graph?.addEdge({
      //   target: { x: 80, y: 50 },
      //   source: { x: 160, y: 50 },
      //   tools: [
      //     {
      //       name: 'contextmenu',
      //       args: {
      //         graph: this.graph
      //       }
      //     }
      //   ]
      // });
    } else if (key === '2') {
      const { e } = this.contextMenu;
      if (cell.isNode()) {
        const outgoingEdges = this.graph?.getOutgoingEdges(cell);
        const incomingEdges = this.graph?.getIncomingEdges(cell);
        const { clientX, clientY } = e;
        const pos = this.graph.clientToGraph(clientX, clientY);
        if (outgoingEdges) {
          outgoingEdges.forEach((edge: Edge) => {
            edge.setSource(pos);
          });
        }
        if (incomingEdges) {
          incomingEdges.forEach((edge: Edge) => {
            edge.setTarget(pos);
          });
        }
        /*
          X6删除接口，默认删除节点，会删除关联的边。可以配置disconnectEdges，
          会把关联边的target和source重置为(0,0)，且tools无法操作，目前没有找到有效方案。
          但是可以提前切除边和节点的关系，然后删除节点
        */
        // this.graph?.removeNode(cell);
        this.graph?.removeCells([cell]);
      } else if (cell.isEdge()) {
        this.graph?.removeEdge(cell);
      }
    }
  };

  renderMenu() {
    return (
      <Menu onClick={this.onMenu}>
        <Menu.Item key="1">复制</Menu.Item>
        <Menu.Item key="2">删除</Menu.Item>
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

  private onContextMenu(args: any) {
    const { e } = args;
    // 拿到当前节点信息
    this.contextMenu = args;
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
