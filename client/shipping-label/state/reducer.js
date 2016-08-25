import {
	OPEN_PRINTING_FLOW,
	EXIT_PRINTING_FLOW,
	UPDATE_ADDRESS_VALUE,
	UPDATE_PACKAGE_WEIGHT,
	UPDATE_RATE,
	PURCHASE_LABEL_REQUEST,
	PURCHASE_LABEL_RESPONSE,
} from './actions';

const reducers = {};

reducers[ OPEN_PRINTING_FLOW ] = ( state ) => {
	return { ...state,
		showDialog: true,
	};
};

reducers[ EXIT_PRINTING_FLOW ] = ( state ) => {
	return { ...state,
		showDialog: false,
	};
};

reducers[ UPDATE_ADDRESS_VALUE ] = ( state, { group, name, value } ) => {
	const newState = { ...state,
		form: { ...state.form,
			[ group ]: { ...state.form[ group ],
				values: { ...state.form[ group ].values,
					[ name ]: value,
				},
				validated: false,
				validationResult: null,
			},
		},
	};
	if ( 'country' === name ) {
		return reducers[ UPDATE_ADDRESS_VALUE ]( newState, { group, name: 'state', value: '' } );
	}
	return newState;
};

reducers[ UPDATE_PACKAGE_WEIGHT ] = ( state, { packageIndex, value } ) => {
	const newPackages = [ ...state.form.packages.values ];
	newPackages[ packageIndex ] = { ...newPackages[ packageIndex ],
		weight: parseFloat( value ),
	};
	return { ...state,
		form: { ...state.form,
			packages: { ...state.form.packages,
				values: newPackages,
			},
		},
	};
};

reducers[ UPDATE_RATE ] = ( state, { packageIndex, value } ) => {
	const newRates = [ ...state.form.rates.values ];
	newRates[ packageIndex ] = value;
	return { ...state,
		form: { ...state.form,
			rates: { ...state.form.rates,
				values: newRates,
			},
		},
	};
};

reducers[ PURCHASE_LABEL_REQUEST ] = ( state ) => {
	return { ...state,
		form: { ...state.form,
			isSubmitting: true,
		},
	};
};

reducers[ PURCHASE_LABEL_RESPONSE ] = ( state, { response, error } ) => {
	const newState = { ...state,
		form: { ...state.form,
			isSubmitting: false,
		},
	};
	if ( ! error ) {
		newState.labels = response;
		newState.showDialog = false;
	}
	return newState;
};

export default ( state = {}, action ) => {
	if ( reducers[ action.type ] ) {
		return reducers[ action.type ]( state, action );
	}
	return state;
};
