/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, Content } from './styles';

import api from '~/services/api';
import history from '~/services/history';

import maskFormat from '~/util/maskFormat';

import Button from '~/components/Button';
import LoadingIndicator from '~/components/LoadingIndicator';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  street: Yup.string().required('Logradouro obrigatório'),
  number: Yup.number()
    .typeError('Número obrigatório')
    .positive('Número deve ser válido')
    .required('Número obrigatório'),
  complement: Yup.string().nullable(true),
  city: Yup.string().required('Nome da cidade obrigatória'),
  state: Yup.string().required('Nome do estado obrigatório'),
  cep: Yup.string().required('CEP obrigatório'),
});

export default function Recipient({ match }) {
  const { recipientId } = match.params;
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(!!recipientId);

  async function handleSubmit(data) {
    try {
      if (recipientId) {
        await api.put(`recipients/${recipientId}`, data);
        toast.success('Destinatário atualizado com sucesso!');
      } else {
        await api.post('recipients', data);
        toast.success('Destinatário cadastrado com sucesso!');
      }

      history.push('/recipients');
    } catch (error) {
      toast.error(
        'Um erro ocorreu, verifique os dados ou tente novamente em breve.'
      );
    }
  }

  useEffect(() => {
    async function loadRecipient(id) {
      let hasErrors = false;
      setLoading(true);

      try {
        const response = await api.get(`recipients/${id}`);

        setProfile(response.data);
      } catch (error) {
        toast.error(
          'Falha ao consultar dados do destinatário. Verifique se o identificador é válido e tente novamente em breve.'
        );
        hasErrors = true;
      }

      setLoading(false);
      if (hasErrors) {
        history.push('/recipients');
      }
    }

    if (recipientId) {
      loadRecipient(recipientId);
    }
  }, [recipientId]);

  return (
    <Container>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div>
            <h1>{recipientId ? 'Edição' : 'Cadastro'} de destinatários</h1>
            <div>
              <Button
                bgColor="#ccc"
                icon="MdChevronLeft"
                text="Voltar"
                onClick={() => history.push('/recipients')}
              />
              <Button type="submit" icon="MdDone" text="Salvar" form="form" />
            </div>
          </div>
          <Content>
            <Form
              id="form"
              schema={schema}
              initialData={
                profile.cep
                  ? {
                      ...profile,
                      cep: maskFormat(profile.cep, 'XXXXX-XXX'),
                    }
                  : profile
              }
              onSubmit={handleSubmit}
            >
              <label htmlFor="name">
                Nome
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="João da Silva"
                />
              </label>
              <div>
                <label htmlFor="street">
                  Logradouro
                  <Input
                    name="street"
                    id="street"
                    type="text"
                    placeholder="Rua Caminho das Videiras"
                  />
                </label>
                <label htmlFor="number">
                  Número
                  <Input
                    name="number"
                    id="number"
                    type="number"
                    placeholder="1592"
                  />
                </label>
                <label htmlFor="complement">
                  Complemento
                  <Input
                    name="complement"
                    id="complement"
                    type="text"
                    // placeholder="Bloco 5, Apto 71"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="city">
                  Cidade
                  <Input
                    name="city"
                    id="city"
                    type="text"
                    placeholder="Ronda Alta"
                  />
                </label>
                <label htmlFor="state">
                  Estado
                  <Input
                    name="state"
                    id="state"
                    type="text"
                    placeholder="Espírito Santo"
                  />
                </label>
                <label htmlFor="cep">
                  CEP
                  <Input
                    name="cep"
                    id="cep"
                    type="text"
                    placeholder="95923-610"
                    onChange={event => {
                      const valueMasked = maskFormat(
                        event.target.value,
                        'XXXXX-XXX'
                      );
                      event.target.value = valueMasked;
                    }}
                  />
                </label>
              </div>
            </Form>
          </Content>
        </>
      )}
    </Container>
  );
}

Recipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipientId: PropTypes.string,
    }),
  }),
};

Recipient.defaultProps = {
  match: {
    params: {
      recipientId: null,
    },
  },
};
