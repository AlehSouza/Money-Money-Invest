import './styles.scss'
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DetailsLoan() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const {id} = router.query
    const [loan, setLoan] = useState({})
    const {annualBilling, city, company, document, email, fullName, number, phoneNumber, requestedAmount, state, street, zipCode } = loan

    const disableLoading = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    const deleteLoan = () => {
        fetch(`http://localhost:3004/creditRequests/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            router.push('/loan')
        })
        .catch(error => {
            disableLoading()
            console.log(error)
        })
    }

    const getLoan = () => {
        setLoading(true)
        fetch(`http://localhost:3004/creditRequests/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLoan(data)
            disableLoading()
        })
        .catch(error => {
            disableLoading()
            console.log(error)
        })
    }

    useEffect(() => {
        if(id) getLoan()
    }, [id])


    function handleBackButton() {
        router.back();
    }

    return (
        <main className="main">
            {
                loading ? <Spinner /> :
                    <div className="details">
                        <div className="btn-back" onClick={handleBackButton}>
                            <Image width="16" height="16" src="/arrow.png" alt="arrow" />
                            <span>Voltar</span>
                        </div>
                        <h2>Detalhes</h2>
                        <div className="details-remove">
                            <h3>{company|| 'Não registrado'}</h3>
                            <div onClick={() => deleteLoan()}>
                                <Image width="11" height="12" src="/trash.png" alt="trash"/>
                                <span>Remover solicitação</span>
                            </div>
                        </div>
                        <div className="line-break"></div>
                        <span>Valor solicitado</span>
                        <label>R$ {requestedAmount|| 'Não registrado'}</label>
                        <span>Faturamento anual</span>
                        <label>R$ {annualBilling|| 'Não registrado'}</label>
                        <Link href={`/loan/edit/[id]`} as={`/loan/edit/${id}`}>
                            <button className="details-edit">
                                Deseja editar Solicitação? clique para editar
                            </button>
                        </Link>
                        <h3>Endereço</h3>
                        <div className="line-break"></div>
                        <span>Endereço</span>
                        <label>
                            {street || '-'},&nbsp; 
                            {number || '-' },&nbsp;
                            {city|| '-'} -&nbsp;
                            {state|| '-'}
                        </label>
                        <span>CEP</span>
                        <label>{zipCode|| 'Não registrado'}</label>
                        <h3>Contato</h3>
                        <div className="line-break"></div>
                        <span>Nome</span>
                        <label>{fullName|| 'Não registrado'}</label>
                        <span>CPF</span>
                        <label>{document || 'Não registrado'|| 'Não registrado'}</label>
                        <span>Telefone</span>
                        <label>{phoneNumber|| 'Não registrado'}</label>
                        <span>Email</span>
                        <label>{email|| 'Não registrado'}</label>
                    </div>
            }
        </main>
    )
}