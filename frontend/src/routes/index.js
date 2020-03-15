import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Delivery from '~/pages/Delivery';
import Deliverymen from '~/pages/Deliverymen';
import Deliveryman from '~/pages/Deliveryman';
import Recipients from '~/pages/Recipients';
import Recipient from '~/pages/Recipient';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/delivery" component={Delivery} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
