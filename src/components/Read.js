import React from 'react';
import PropTypes from 'prop-types';

import { apiRequest } from '../middleware/reduxQuest';

const {string, func} = PropTypes;


export default class Read extends React.PureComponent {
    static propTypes = {
        url: string.isRequired,
        render: func,
        children: func,
    };

    state = {
        response: null,
        error: null
    };

    constructor(...args) {
        super(...args);
        const { url } = this.props;

        apiRequest(url, { method: 'GET'})
            .then(
                response => this.updateSuccess(response),
                error => this.updateError(error)
            );
    }

    updateSuccess = response => this.setState({ response });
    updateError = error => this.setState({ error });

    render() {
        const { render, children } = this.props;
        const { response, error } = this.state;

        const preferredRender = render || children;

        if (!(response || error)) { return null; }

        if (!preferredRender ) { return null; }

        return preferredRender(response, error)
    }

}
