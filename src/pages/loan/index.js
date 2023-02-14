import Request from '@/components/Request/'
import Spinner from '@/components/Spinner'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './style.scss'

export default function ListLoan() {
    const [ loading, setLoading ] = useState(false)
    const [ search, setSearch ] =  useState('')
    const [ filteredRequests, setFilteredRequests ] = useState([])
    const [ requests, setRequests ] = useState([])

    const disableLoading = () => setTimeout(() => {
        setLoading(false) 
    }, 2000);

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

    const handleSearch = (value) => {
        setSearch(value)
        if(search != '') {
            const filteredData = requests.filter(item => {
                return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
            })
            setFilteredRequests(filteredData)
        }
        else {
            setFilteredRequests(requests)
        }
    }

    useEffect(() => {
        getRequests()
    }, []) 


    return (
        <main className="main">
            <div className="container">
                <div className="header">
                    <div className="icon">
                        <Image width="64" height="64" src="/alex_sanchez.png" alt="Icon"/>
                    </div>
                    <div className="header-infos">
                        <span>Seja bem-vindo</span>
                        <label>Alex Sanchez</label>
                    </div>
                    <div className="header-notifications">
                        <div className="badge">1</div>
                        <Image src="/bell.png" width="18" height="21" alt="Notifications"/>
                    </div>
                </div> 
                <div className="search">
                    <div className="opportunities">
                        <h1>Oportunidades</h1>
                        <div>
                            <Link href='/loan/new'>
                                +
                            </Link>
                        </div>
                    </div>
                    <div className="opportunities-search">
                        <Image src="/lens.png" width="20" height="20" alt="Lens"/>
                        <input type="text" placeholder="Busque uma oportunidade" onChange={(e) => handleSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="list-opportunities">
                    {
                        loading ? <Spinner/> : search.length > 1 
                        ? filteredRequests.map(request => 
                            <Request request={request} key={request.id}/>) 
                            : requests.map(request => 
                                <Request request={request} key={request.id}/>)
                    }
                </div>
            </div>
        </main>
    )
}