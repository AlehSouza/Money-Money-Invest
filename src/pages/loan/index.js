import Request from '@/components/Request/'
import Spinner from '@/components/Spinner'
import { useEffect, useState } from 'react'
import './style.scss'

export default function ListLoan() {
    const [ loading, setLoading ] = useState(false)
    const disableLoading = () => setTimeout(() => {
        setLoading(false) 
    }, 2000);
    const [ requests, setRequests ] = useState([])

    const getRequests = async() => {
        setLoading(true)
        fetch('http://localhost:3004/creditRequests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            disableLoading()
            setRequests(data)
        })
        .catch(error => {
            disableLoading()
            console.log(error)
        });
    }

    useEffect(() => {
        getRequests()
    }, []) 


    return (
        <main className="main">
            <div className="container">
                <div className="header">
                    <div className="icon">
                        <img src="/alex_sanchez.png"/>
                    </div>
                    <div className="header-infos">
                        <span>Seja bem-vindo</span>
                        <label>Alex Sanchez</label>
                    </div>
                    <div className="header-notifications">
                        <div className="badge">1</div>
                        <img src="/bell.png"/>
                    </div>
                </div> 
                <div className="search">
                    <div className="opportunities">
                        <h1>Oportunidades</h1>
                        <div>
                            <a href='/loan/new'>
                                +
                            </a>
                        </div>
                    </div>
                    <div className="opportunities-search">
                        <img src="/lens.png"/>
                        <input type="text" placeholder="Busque uma oportunidade"/>
                    </div>
                </div>
                <div className="list-opportunities">
                    {
                        loading ? <Spinner/> : requests.map(request => <Request request={request} key={request.id}/>)
                    }
                </div>
            </div>
        </main>
    )
}