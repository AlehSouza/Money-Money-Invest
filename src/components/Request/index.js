import './styles.scss'
import Image from 'next/image'

export default function Request(props) {
    return (
        <a href={`/loan/${props.request.id}`}>
            <div className="opportunity">
                <div>
                    <h3>{props.request.company}</h3>
                    <span>{props.request.document}</span>
                    <h2>R$ {props.request.annualBilling}</h2>
                </div>
                
                    <button>
                        <Image width="8" height="12" alt="arrow-r" src="/arrow-r.png"/>
                    </button>
            </div>
        </a>
    )
}