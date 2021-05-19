import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Items } from './components/Items';
import { ItemProvider } from './context/ItemContext';
import { CreateItem } from './components/CreateItem';
import { ItemDetail } from './components/ItemDetail';
import { EditItem } from './components/EditItem';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <ItemProvider>
          <Route exact path='/items/:id' component={ItemDetail} />
          <Route exact path='/items' component={Items} />
          <Route exact path='/create-item' component={CreateItem} />
          <Route exact path='/items/edit/:id' component={EditItem} />
        </ItemProvider>
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
