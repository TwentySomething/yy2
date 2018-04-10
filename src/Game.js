import React from 'react';
import {Colors,Button} from '@blueprintjs/core';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      used: [],
      score: 0,
      init: false,
    };
    this.setting = {
      size: props.size || [9, 9],
      layout: {
        itemSize: 40,
        itemSpacing: 10,
      }
    };
  }
  onMove(id) {
    this.state.used.push(id);
    this.state.init = true;
    this.state.score++;
    const active = this.getAvailableFields(id);
    this.props.onMove(this.state.score);
    if (active.length === 0) {
      this.props.onFinish(this.state.score);
    }
    this.setState({active});
  }
  renderCanvas() {
    const size = this.setting.size;
    const items = [];

    for (let id = 0; id < size[0] * size[1]; id++) {
      const init = this.state.init;
      const active = this.state.active.indexOf(id) > -1;
      const used = this.state.used.indexOf(id) > -1;
      items.push(<Button
        key={id}
        minimal={true}
        text={used ? this.state.used.indexOf(id)+1 : null}
        disabled={init ? !active || used : false}
        onClick={() => this.onMove(id)}
        style={{
          width: this.setting.layout.itemSize,
          height: this.setting.layout.itemSize,
          margin: 'auto',
          background: used ? Colors.GRAY3 : (active ? Colors.BLUE5 : Colors.GRAY5),
          color: Colors.WHITE,
        }}
      />);
    }

    return items;
  }
  getAvailableFields(id) {
    const size = this.setting.size;
    const position = [
      // left
      id % this.setting.size[0] + 1,
      // top
      Math.floor(id / this.setting.size[1]) + 1,
    ];

    const active = [];

    const activate = (x, y) => {
      if (
        position[0] + x > 0 && (position[0] + x) / size[0] < 1 &&
        position[1] + y > 0 && (position[1] + y) / size[1] < 1 &&
        this.state.used.indexOf(id + x + y * size[0]) === -1
      )
        active.push(id + y*size[0] + x);
    };

    activate(-2, -1);
    activate(-1, -2);
    activate(+1, -2);
    activate(+2, -1);
    activate(+1, +2);
    activate(+2, +1);
    activate(-1, +2);
    activate(-2, +1);

    return active;
  }
  render() {
    return (
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto '.repeat(this.setting.size[0]),
        gridColumnGap: this.setting.layout.itemSpacing,
        gridRowGap: this.setting.layout.itemSpacing,
        margin: 'auto',
        maxWidth: this.setting.layout.itemSize * this.setting.size[0] + this.setting.layout.itemSpacing * (this.setting.size[0] - 1),
        maxHeight: this.setting.layout.itemSize * this.setting.size[1] + this.setting.layout.itemSpacing * (this.setting.size[1] - 1),
      }}>
        {this.renderCanvas()}
      </div>
    );
  }
}