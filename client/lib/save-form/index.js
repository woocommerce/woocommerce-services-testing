import { setField } from '../../state/form/actions.js';

const saveForm = ( store, url, nonce ) => {
	return dispatch => {
		dispatch( setField( 'isSaving', true ) );

		const request = {
			method: 'PUT',
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': nonce,
			},
			body: JSON.stringify( store.getState().settings ),
		};

		return fetch( url, request )
			.then( response => {
				dispatch( setField( 'isSaving', false ) );
				dispatch( setField( 'errors', null ) );
				dispatch( setField( 'success', false ) );
				return response.json();
			} )
			.then( json => {
				if ( json.success ) {
					dispatch( setField( 'success', true ) );
					return;
				}

				if ( json.data && 'validation_failure' === json.data.error ) {
					dispatch( setField( 'errors', json.data.data.fields ) );
					return;
				}

				dispatch( setField( 'errors', JSON.stringify( json ) ) );
				return;
			} )
			.catch( ( e ) => {
				dispatch( setField( 'isSaving', false ) );
				dispatch( setField( 'errors', e ) );
			} );
	};
};

export default saveForm;
