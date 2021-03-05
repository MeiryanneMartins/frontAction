import {Input} from '../../components';
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface LocationFormData {
  name: string;
  email: string;
  password: string;
}

import './styles.css';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

// import { Container } from './styles';

const Location: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
  
    const handleSubmit = useCallback(
      async (data: LocationFormData) => {
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
            description: 'Funcionário Cadastrado',
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
            
          <legend>Cadastrar Local</legend> 


          <Input name="local" placeholder="Local" />
          <Input name="cidade" placeholder="Cidade" />
          <Input name="rua" placeholder="Rua" />
          <Input name="bairro" placeholder="Bairro" />
          <Input name="numero" placeholder="Nº" />
          
          
        
          <Select
                name="Estado"
                label="Estado"
                options = {[

                    {id: 'Maranhão', label: 'Maranhão'},
                    {id: 'Rio Grande do Sul', label: 'Rio Grande do Sul'},
                    {id: 'São Paulo', label: 'São Paulo'},
                ]}
                 />
                <Select
                name="Cidade"
                label="Cidade"
                options = {[

                    {id: 'São Luís', label: 'São Luís'},
                    {id: 'Paço do Lumiar', label: 'Paço do Lumiar'},
                    {id: 'São José de Ribamar', label: 'São José de Ribamar'},
                    {id: 'Imperatriz', label: 'Imperatriz'},
                    {id: 'Açailândia', label: 'Açailândia'},
                ]}
                 />
                <Textarea name ="Obs" label = "Observação" />

        <legend></legend>
    
          <button type ="button">
              CADASTRAR
          </button>

        </Form>

      </fieldset>
         
      </footer>

      
      <footer>
          <p>
          Importante! <br />
          Preencha todos os dados!
          </p>
       

      </footer>

  </main>
   </div>);
}

export default Location;


