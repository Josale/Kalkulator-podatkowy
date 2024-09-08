import React, { ReactNode } from 'react'
import '../index.scss'
import TaxInput from './components/TaxInput/TaxInput'

export default class App extends React.Component {

  render(): ReactNode {

    return (
      <div className='container'>
        <p className='container__info'>kalkulator podatkowy</p>
      <TaxInput />
      </div>
    );
  }
}

