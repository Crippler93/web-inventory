import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Items } from './components/Item/Items';
import ItemProvider from './components/Item/context/ItemContext';
import { ItemDetail } from './components/Item/ItemDetail';
import { CreateEditItem } from './components/Item/CreateEditItem';
import { ItemToast } from './components/Item/ItemToast';

import './custom.css'
import { CategoryList } from './components/Category/List';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <ItemProvider>
          <Route exact path='/items/:id' component={ItemDetail} />
          <Route exact path='/items' component={Items} />
          <Route exact path='/create-item' component={CreateEditItem} />
          <Route exact path='/items/edit/:id' component={CreateEditItem} />
          <Route exact path='/category' component={CategoryList}></Route>
          <ItemToast/>
        </ItemProvider>
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
