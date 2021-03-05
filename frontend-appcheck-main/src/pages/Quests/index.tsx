import {Input} from '../../components';
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface QuestsFormData {
  name: string;
  email: string;
  password: string;
}

import './styles.css';
import Textarea from '../components/Textarea';

// import { Container } from './styles';

const Quests: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
  
    const handleSubmit = useCallback(
      async (data: QuestsFormData) => {
        try {
          formRef.current?.setErrors({});
  
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          });
  
          await schema.validate(data, {
            abortEarly: false,
          });
  
          await api.post('/users', data);
  
          history.push('/');
  
          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu logon no MultiAction',
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
  
            formRef.current?.setErrors(errors);
  
            return;
          }
  
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      },
      [addToast, history],
    );
  
  return (
  <div id = "page-form-login" className = "container">
  <main>
  <footer>
      <fieldset>
        <Form ref={formRef} onSubmit={() => {console.log('okja')}}>
          <legend>Cadastrar Questionário</legend> 

          <legend>MATERIAIS/DOCS</legend>
         <Input name="pergunta" placeholder="Digite sua Pergunta..." />
         <Textarea name ="Obs" label = "Alguma Observação?" />
          
          <button type ="button">
              ENVIAR
          </button>
          <legend></legend>
          <legend>FISCALIZAÇÃO</legend>
         <Input name="pergunta" placeholder="Digite sua Pergunta..." />
         <Textarea name ="Obs" label = "Alguma Observação?" />
         <button type ="button">
              ENVIAR
          </button>
        </Form>

      </fieldset>
         
      </footer>

      
      <footer>
          <p>
          Importante! <br />
          Preencha todos os campos!
          </p>
       

      </footer>

  </main>
   </div>);
}

export default Quests;


