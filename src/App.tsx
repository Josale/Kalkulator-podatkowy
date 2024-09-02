import React, { ReactNode } from 'react'
import TaxInput from './components/TaxInput/TaxInput'

export default class App extends React.Component {

  render(): ReactNode {

    return (
      <div className='container'>
      <TaxInput />
      </div>
    );
  }
}

