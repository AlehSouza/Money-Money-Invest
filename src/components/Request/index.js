import './styles.scss'

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
                        <img src="/arrow-r.png"/>
                    </button>
            </div>
        </a>
    )
}