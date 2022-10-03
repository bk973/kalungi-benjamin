import React from 'react';
import {useParams} from 'react-router-dom';

const withRouter = WrappedComponent => props =>
{
    const {name, id} = useParams();

    return (
        <WrappedComponent
            {...props}
            name={name}
            id={id}
        />
    );
};

export default withRouter;