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
      <Route exact path="/" component={SignIn} />

      <Route exact path="/deliveries" component={Deliveries} isPrivate />
      <Route
        path={['/deliveries/new', '/deliveries/:deliveryId']}
        component={Delivery}
        isPrivate
      />
      <Route exact path="/deliverymen" component={Deliverymen} isPrivate />
      <Route
        path={['/deliverymen/new', '/deliverymen/:deliverymanId']}
        component={Deliveryman}
        isPrivate
      />
      <Route exact path="/recipients" component={Recipients} isPrivate />
      <Route
        path={['/recipients/new', '/recipients/:recipientId']}
        component={Recipient}
        isPrivate
      />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
