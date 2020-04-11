/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, Content, StyledSelect } from './styles';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import LoadingIndicator from '~/components/LoadingIndicator';

const schema = Yup.object().shape({
  recipient_id: Yup.number().required('Destinatário obrigatório'),
  deliveryman_id: Yup.number().required('Entregador obrigatório'),
  product: Yup.string().required('Descrição do produto obrigatória'),
});

export default function Delivery({ match }) {
  const { deliveryId } = match.params;
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(!!deliveryId);

  async function filterRecipients(inputValue) {
    const response = await api.get('recipients', {
      params: {
        q: inputValue,
      },
    });

    if (response.data.rows) {
      return response.data.rows.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));
    }

    return [];
  }

  async function filterDeliverymen(inputValue) {
    const response = await api.get('deliverymen', {
      params: {
        q: inputValue,
      },
    });

    if (response.data.rows) {
      return response.data.rows.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));
    }

    return [];
  }

  function recipientOptions(inputValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filterRecipients(inputValue));
      }, 1000);
    });
  }

  function deliverymanOptions(inputValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filterDeliverymen(inputValue));
      }, 1000);
    });
  }

  async function handleSubmit(data) {
    try {
      if (deliveryId) {
        await api.put(`deliveries/${deliveryId}`, data);
        toast.success('Encomenda atualizada com sucesso!');
      } else {
        await api.post('deliveries', data);
        toast.success('Encomenda cadastrada com sucesso!');
      }

      history.push('/deliveries');
    } catch (error) {
      toast.error(
        'Um erro ocorreu, verifique os dados ou tente novamente em breve.'
      );
    }
  }

  useEffect(() => {
    async function loadDelivery(id) {
      let hasErrors = false;
      setLoading(true);

      try {
        const response = await api.get(`deliveries/${id}`);

        setDelivery(response.data);
      } catch (error) {
        toast.error(
          'Falha ao consultar dados da encomenda. Verifique se o identificador é válido e tente novamente em breve.'
        );
        hasErrors = true;
      }

      setLoading(false);
      if (hasErrors) {
        history.push('/deliveries');
      }
    }

    if (deliveryId) {
      loadDelivery(deliveryId);
    }
  }, [deliveryId]);

  return (
    <Container>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div>
            <h1>{deliveryId ? 'Edição' : 'Cadastro'} de encomendas</h1>
            <div>
              <Button
                bgColor="#ccc"
                icon="MdChevronLeft"
                text="Voltar"
                onClick={() => history.push('/deliveries')}
              />
              <Button type="submit" icon="MdDone" text="Salvar" form="form" />
            </div>
          </div>
          <Content>
            <Form
              id="form"
              schema={schema}
              initialData={delivery}
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="recipient_id">
                  Destinatário
                  <StyledSelect
                    name="recipient_id"
                    recordName="recipient"
                    id="recipient_id"
                    defaultOptions
                    loadOptions={recipientOptions}
                    placeholder="Selecione..."
                    loadingMessage={() => 'Carregando...'}
                    noOptionsMessage={() => 'Sem opções'}
                  />
                </label>
                <label htmlFor="deliveryman_id">
                  Entregador
                  <StyledSelect
                    name="deliveryman_id"
                    recordName="deliveryman"
                    id="deliveryman_id"
                    defaultOptions
                    loadOptions={deliverymanOptions}
                    placeholder="Selecione..."
                    loadingMessage={() => 'Carregando...'}
                    noOptionsMessage={() => 'Sem opções'}
                  />
                </label>
              </div>
              <label htmlFor="product">
                Nome do produto
                <Input
                  name="product"
                  id="product"
                  type="text"
                  placeholder='Monitor Samsung 24"'
                />
              </label>
            </Form>
          </Content>
        </>
      )}
    </Container>
  );
}

Delivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.string,
    }),
  }),
};

Delivery.defaultProps = {
  match: {
    params: {
      deliveryId: null,
    },
  },
};
