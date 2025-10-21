import PropTypes from 'prop-types';


export function StatsCard({title, description}){
    return(
        <div className='statcard'>
            <img alt=''/>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}

StatsCard.PropTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}
