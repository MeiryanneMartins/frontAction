import {Input} from '../../components';
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  cpf:string;
  
}

import './styles.css';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

// import { Container } from './styles';

const Employee: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
  
    const handleSubmit = useCallback(
      async (data: EmployeeFormData) => {
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
          <legend>Cadastrar Funcionário</legend> 


          <Input name="name" placeholder="Nome Completo" />
          <Input name="cpf" placeholder="Digite seu CPF" />
          <Input name="email" type="email" placeholder="Digite seu Email" />
          <Input name = "date" type="data" placeholder="Digite a data do seu Nascimento" />
          <Select
         name="cargo"
         label="Cargo"
         options = {[

             {id: 'Supervisor', label: 'Supervisor'},
             {id: 'Preposto', label: 'Preposto'},
             {id: 'Fiscal', label: 'Fiscal'},
             {id: 'Funcionário', label: 'Funcionário'},
         ]}
          />

<Select
         name="Vincular a Local"
         label="Vincular Local"
         options = {[
            
             {id: '', label: ''},
             {id: 'JFJAREINHA_CENTRO', label: 'JUSTIÇA FEDERAL DE 1º GRAU SEÇÃO JUDICIÁRIA DO MARANHÃO (AREINHA/CENTRO)'},
             {id: 'JFJ_HOLANDESES', label: 'JUSTIÇA FEDERAL DE 1º GRAU SEÇÃO JUDICIÁRIA DO MARANHÃO (HOLANDESES)'},
             {id: 'TJM', label: 'TRIBUNAL DE JUSTIÇA DO MARANHÃO  '},
             {id: 'ISS', label: 'INSS – SÃO LUIS'},
             {id: 'DPU', label: 'DEFENSORIA PUBLICA DA UNIÃO – DPU '},
             {id: 'ME', label: 'MINISTERIO DA ECONOMIA'},
             {id: 'PGJM', label: 'PROCURADORIA GERAL DE JUSTIÇA DO MARANHÃO'},
             {id: 'DNIT', label: 'DEPARTAMENTO NACIONAL DE INFRAESTRUTURA DE TRANSPORTES – DNIT – MA'},

         ]}
          />
        <legend></legend>
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

export default Employee;


