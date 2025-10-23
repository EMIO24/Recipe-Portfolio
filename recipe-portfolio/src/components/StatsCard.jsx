import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export function StatsCard({ title, description, to }) {
    const content = (
        <div className="statcard" role="group">
            <img alt="" />
            <p>{title}</p>
            <p>{description}</p>
        </div>
    );

    return to ? (
        <Link to={to} style={{ textDecoration: 'none' }}>
            {content}
        </Link>
    ) : content;
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    to: PropTypes.string,
};