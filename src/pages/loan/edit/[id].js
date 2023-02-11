import Spinner from '@/components/Spinner';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import './styles.scss'

export default function EditLoan() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState(false);
    const [ loan, setLoan ] = useState({})
    const router = useRouter();
    const {id} = router.query

    const {annualBilling, city, company, document, email, fullName, number, phoneNumber, requestedAmount, state, street, zipCode } = loan

    console.log(id)

    const disableLoading = () => setTimeout(() => {
        setLoading(false)
    }, 1000);

    const onSubmit = data => {
        setLoading(true)
        fetch(`http://localhost:3004/creditRequests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            disableLoading()
            console.log(data)
        })
        .catch(error => {
            disableLoading()
            console.log(error)
        });
    };

    const getRequest  = async() => {
        setLoading(true)
        fetch(`http://localhost:3004/creditRequests/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            disableLoading()
            setLoan(data)
            console.log(data)
        })
    }

    function handleBackButton(){
        router.back();
    }

    useEffect(() => {
        getRequest()
    }, [id]) 


    return (
        <main className="main">
            {
                loading ? <Spinner/> : 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="btn-back" onClick={() => handleBackButton()}>
                        <Image width="16" height="16" src="/arrow.png" alt="arrow"/>
                        <span>Voltar</span>
                    </div>
                    <h2>Adicionar nova solicitação</h2>
                    <div className="line-break"/>
                    <label>Nome da empresa</label>
                    <input type="text" defaultValue={company} placeholder="Nome da empresa" {...register("company", {required: true, maxLength: 80})} />
                    <label>Faturamento anual</label>
                    <input type="number" defaultValue={annualBilling} placeholder="Faturamento Anual" {...register("annualBilling", {required: true, maxLength: 80})} />
                    <label>Valor solicitado</label>
                    <input type="number" defaultValue={requestedAmount} placeholder="Valor Solicitado" {...register("requestedAmount", {required: true, maxLength: 80})} />
                    <br/>
                    <h3>Endereço</h3>
                    <div className="line-break"/>

                    <label>CEP</label>
                    <input type="text" defaultValue={zipCode} placeholder="CEP" {...register("zipCode", { maxLength: 80})} />
                    <div className="address">
                        <div>
                            <label>Rua</label>
                            <input type="text" defaultValue={street} placeholder="Rua" {...register("street", { maxLength: 80})} />
                        </div>
                        <div>
                            <label>Número</label>
                            <input type="text" defaultValue={number} placeholder="Número" {...register("number", { maxLength: 80})} />
                        </div>
                    </div>
                    <div className="address state">
                        <div>
                            <label>Cidade</label>
                            <input type="text" defaultValue={city} placeholder="Cidade" {...register("city", { maxLength: 80})} />
                        </div>
                        <div>
                            <label>Estado</label>
                            <select {...register("state")} >
                                <option selected disabled hidden>Estado (UF)</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                                <option value="EX">Estrangeiro</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <h3>Contato</h3>
                    <div className="line-break"/>
                    <label>Nome Completo</label>
                    <input type="text" defaultValue={fullName} placeholder="Nome completo do responsável pela empresa" {...register("fullName", {required: true, maxLength: 80})} />
                    <label>Telefone de Contato</label>
                    <input type="tel" defaultValue={phoneNumber} placeholder="Telefone Contato" {...register("phoneNumber", {required: true, maxLength: 80})} />
                    <label>Email</label>
                    <input type="email" defaultValue={email} placeholder="Email" {...register("email", {required: true, maxLength: 80})} />
                    <label>CPF</label>
                    <input type="text" defaultValue={document} placeholder="CPF" {...register("document", {required: true, maxLength: 80})} />
                    <br/>

                    <button type="submit">
                        {
                            loading ? <Spinner/> :  <span>Editar</span>
                        }
                    </button>
                </form>
            }
        </main>
    )
}