import React from 'react';
import {
  Intent, Classes,
  Card, Callout,
  Navbar, NavbarHeading, NavbarDivider, NavbarGroup,
  Button, Radio, RadioGroup
} from '@blueprintjs/core';
import Game from './Game';

const VIEW_MAIN     = 0;
const VIEW_SETTING  = 1;
const VIEW_PLAYING  = 2;
const VIEW_SCORE    = 3;
const VIEW_SCORES   = 4;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: VIEW_MAIN,
      setting: {
        size: []
      },
      score: null
    };
  }
  resetState() {
    this.setState({
      view: VIEW_MAIN,
      setting: {
        size: []
    }});
  }
  setView(view) {
    this.setState({view});
  }
  isView(view) {
    return this.state.view === view;
  }
  renderMain() {
    return <Callout>
      <h5>En yüksek skorlar</h5>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto',
        gridColumnGap: 10,
        gridRowGap: 10,
      }}>
        <Card elevation={2} className={Classes.SKELETON}>
          <h5>9x9</h5>
          47
        </Card>
        <Card elevation={1} className={Classes.SKELETON}>
          <h5>8x8</h5>
          50
        </Card>
        <Card elevation={0} className={Classes.SKELETON}>
          <h5>7x7</h5>
          21
        </Card>
        <Card elevation={0} className={Classes.SKELETON}>
          <h5>6x6</h5>
          30
        </Card>
        <Card elevation={0} className={Classes.SKELETON}>
          <h5>5x5</h5>
          18
        </Card>
      </div>
    </Callout>;
  }
  renderGame() {
    return <div style={{marginTop: 10}}>
      <Game
        size={this.state.setting.size}
        onMove={(score) => this.setState({score})}
        onFinish={(score) => {
          this.setView(VIEW_SCORE);
        }}
      />
    </div>;
  }
  renderSettings() {
    return <Callout style={{textAlign: 'center', padding: 20}}>
      <RadioGroup
        onChange={(e) => {
          this.state.setting.size = e.target.value.split(',');
          this.forceUpdate();
        }}
        selectedValue={this.state.setting.size.join(',')}
        inline={true}
      >
        {
          [[5,5], [6,6], [7,7], [8,8], [9,9]]
            .map(size => <Radio key={size.join(',')} label={`${size[0]} x ${size[1]}`} value={size.join(',')} />)
        }
      </RadioGroup>
      <Button
        style={{marginTop: 15}}
        text="Başla"
        disabled={this.state.setting.size.length !== 2}
        onClick={() => this.setView(VIEW_PLAYING)}
      />
    </Callout>;
  }
  renderScore() {
    return <Callout intent={Intent.SUCCESS} icon={null}>
      <p style={{textAlign: 'center'}}>
        <h4>{this.state.score}</h4>
        Oyunu başarıyla tamamladınız. Skorunuz <b>{this.state.score}</b>
      </p>
    </Callout>
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}>
        <div style={{margin: 'auto', minWidth: this.isView(VIEW_PLAYING) ? 'auto' : 500}}>
          <Navbar>
            <NavbarGroup>
              <NavbarHeading>
                <Button
                  disabled={this.isView(VIEW_PLAYING)}
                  minimal={true}
                  large={true}
                  icon="predictive-analysis"
                  onClick={() => this.resetState()}
                />
              </NavbarHeading>
            </NavbarGroup>
            {
              <NavbarGroup align="right">
                <Button
                  text={this.isView(VIEW_MAIN) && "Yeni oyun"}
                  minimal={true}
                  disabled={this.isView(VIEW_PLAYING)}
                  icon="grid"
                  intent={Intent.PRIMARY}
                  onClick={() => this.setView(VIEW_SETTING)}
                />
                <NavbarDivider/>
                <Button
                  text={this.isView(VIEW_MAIN) && "Tüm skorlar"}
                  minimal={true}
                  disabled={this.isView(VIEW_PLAYING)}
                  icon="timeline-bar-chart"
                />
              </NavbarGroup>
            }
          </Navbar>
          {(
            (view) => {switch(view) {
              case VIEW_MAIN: return this.renderMain();
              case VIEW_SETTING: return this.renderSettings();
              case VIEW_PLAYING: return this.renderGame();
              case VIEW_SCORE: return this.renderScore();
              case VIEW_SCORES: return <div>skorlar</div>;
            }}
          )(this.state.view)}
        </div>
      </div>
    );
  }
}