/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, Content } from './styles';

import api from '~/services/api';
import history from '~/services/history';

import AvatarInput from './AvatarInput';
import Button from '~/components/Button';
import LoadingIndicator from '~/components/LoadingIndicator';

const schema = Yup.object().shape({
  avatar_id: Yup.number(),
  name: Yup.string().required('Nome obrigatório.'),
  email: Yup.string()
    .email('E-mail inválido.')
    .required('E-mail obrigatório.'),
});

export default function Deliveryman({ match }) {
  const { deliverymanId } = match.params;
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(!!deliverymanId);

  async function handleSubmit(data) {
    try {
      if (deliverymanId) {
        await api.put(`deliverymen/${deliverymanId}`, data);
        toast.success('Dados atualizados com sucesso!');
      } else {
        await api.post('deliverymen', data);
        toast.success('Dados cadastrados com sucesso!');
      }

      history.push('/deliverymen');
    } catch (error) {
      toast.error(
        'Um erro ocorreu, verifique os dados ou tente novamente em breve.'
      );
    }
  }

  useEffect(() => {
    async function loadDeliveryman(id) {
      let hasErrors = false;
      setLoading(true);

      try {
        const response = await api.get(`deliverymen/${id}`);

        setProfile(response.data);
      } catch (error) {
        toast.error(
          'Falha ao consultar dados do entregador. Verifique se o identificador é válido e tente novamente em breve.'
        );
        hasErrors = true;
      }

      setLoading(false);
      if (hasErrors) {
        history.push('/deliverymen');
      }
    }

    if (deliverymanId) {
      loadDeliveryman(deliverymanId);
    }
  }, [deliverymanId]);

  return (
    <Container>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div>
            <h1>{deliverymanId ? 'Edição' : 'Cadastro'} de entregadores</h1>
            <div>
              <Button
                bgColor="#ccc"
                icon="MdChevronLeft"
                text="Voltar"
                onClick={() => history.push('/deliverymen')}
              />
              <Button type="submit" icon="MdDone" text="Salvar" form="form" />
            </div>
          </div>
          <Content>
            <Form
              id="form"
              schema={schema}
              initialData={profile}
              onSubmit={handleSubmit}
            >
              <AvatarInput name="avatar_id" />
              <label htmlFor="name">
                Nome
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="João da Silva"
                />
              </label>
              <label htmlFor="email">
                E-mail
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="joao@exemplo.com"
                />
              </label>
            </Form>
          </Content>
        </>
      )}
    </Container>
  );
}

Deliveryman.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      deliverymanId: PropTypes.string,
    }),
  }),
};

Deliveryman.defaultProps = {
  match: {
    params: {
      deliverymanId: null,
    },
  },
};
