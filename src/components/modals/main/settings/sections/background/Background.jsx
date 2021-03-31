import React from 'react';

import Checkbox from '../../Checkbox';
import Dropdown from '../../Dropdown';
import FileUpload from '../../FileUpload';
import Slider from '../../Slider';
import Switch from '../../Switch';

import ColourSettings from './Colour';

import { toast } from 'react-toastify';

export default class BackgroundSettings extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      customBackground: localStorage.getItem('customBackground') || '',
      backgroundType: localStorage.getItem('backgroundType') || 'api'
    };
    this.language = window.language.modals.main.settings;
  }

  resetItem(key) {
    switch (key) {
      case 'customBackground':
        localStorage.setItem('customBackground', '');
        this.setState({
          customBackground: ''
        });
        break;

      default:
        toast('resetItem requires a key!');
    }

    toast(this.language.toasts.reset);
  }

  fileUpload(e) {
    localStorage.setItem('customBackground', e.target.result);
    this.setState({
      customBackground: e.target.result
    });
  }

  render() {
    const { background } = this.language.sections;

    let backgroundSettings;

    const APISettings = (
      <>
        <br/>
        <Dropdown label={background.source.api} name='backgroundAPI'>
          <option value='mue'>Mue</option>
          <option value='unsplash'>Unsplash</option>
        </Dropdown>
      </>
    );

    const customSettings = (
      <>
        <h3>{background.source.title}</h3>
        <ul>
          <p>{background.source.custom_url} <span className='modalLink' onClick={() => this.resetItem('customBackground')}>{this.language.buttons.reset}</span></p>
          <input type='text' value={this.state.customBackground} onChange={(e) => this.setState({ customBackground: e.target.value })}></input>
        </ul>
        <ul>
          <p>{background.source.custom_background} <span className='modalLink' onClick={() => this.resetItem('customBackground')}>{this.language.buttons.reset}</span></p>
          <button className='uploadbg' onClick={() => document.getElementById('bg-input').click()}>{background.source.upload}</button>
          <FileUpload id='bg-input' accept='image/jpeg, image/png, image/webp, image/webm, image/gif' loadFunction={(e) => this.fileUpload(e)} />
        </ul>
      </>
    );

    const colourSettings = <ColourSettings/>;

    switch (this.state.backgroundType) {
      case 'custom': backgroundSettings = customSettings; break;
      case 'colour': backgroundSettings = colourSettings; break;
      // API
      default: backgroundSettings = APISettings; break;
    }

    return (
      <>
        <h2>{background.title}</h2>
        <Switch name='background' text={this.language.enabled} />
        <h3>{background.buttons.title}</h3>
        <Checkbox name='view' text={background.buttons.view} />
        <Checkbox name='favouriteEnabled' text={background.buttons.favourite} />

        <h3>{background.effects.title}</h3>
        <Slider title={background.effects.blur} name='blur' min='0' max='100' default='0' display='%' />
        <Slider title={background.effects.brightness} name='brightness' min='0' max='100' default='100' display='%' />
        <br/><br/>
  
        <Dropdown label='Type' name='backgroundType' onChange={(value) => this.setState({ backgroundType: value })}>
          <option value='api'>API</option>
          <option value='custom'>Custom Image</option>
          <option value='colour'>Custom Colour/Gradient</option>
        </Dropdown>
        <br/>

        {backgroundSettings}
      </>
    );
  }
}