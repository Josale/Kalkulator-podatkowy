import React, { ReactNode } from 'react'
import '../index.scss'
import Calculator from "./pages/Calculator.tsx";

export default class App extends React.Component {

  render(): ReactNode {

    return (
      <div className='app'>
        <Calculator />
      </div>
    );
  }
}

