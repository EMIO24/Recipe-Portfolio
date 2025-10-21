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

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
