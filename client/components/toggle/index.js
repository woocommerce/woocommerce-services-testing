import React, { PropTypes } from 'react';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormToggle from 'components/forms/form-toggle/compact';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import { sanitize } from 'dompurify';

const renderToggleText = ( text ) => {
	return (
		text ? <span className="toggle__text">{ text }</span> : null
	);
};

const renderFieldDescription = ( description ) => {
	return (
		description ? <FormSettingExplanation dangerouslySetInnerHTML={ { __html: sanitize( description, { ADD_ATTR: ['target'] } ) } } /> : null
	);
};

const Toggle = ( { id, schema, checked, placeholder, saveForm, updateValue } ) => {
	const handleChangeEvent = () => {
		updateValue( ! checked );
		// TODO - see if this toggle wants to kick off a form save on change
		saveForm();
	};

	return (
		<FormFieldset>
			<FormLabel htmlFor={ id }>{ schema.title }</FormLabel>
			<FormToggle
				id={ id }
				name={ id }
				placeholder={ placeholder }
				checked={ checked }
				onChange={ handleChangeEvent }
			/>
			{ renderToggleText( schema.text ) }
			{ renderFieldDescription( schema.description ) }
		</FormFieldset>
	);
};

Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	schema: PropTypes.shape( {
		type: PropTypes.string.valueOf( 'string' ),
		title: PropTypes.string.isRequired,
		text: PropTypes.string,
		description: PropTypes.string,
	} ).isRequired,
	checked: PropTypes.bool,
	saveForm: PropTypes.func,
	updateValue: PropTypes.func,
};

Toggle.defaultProps = {
	checked: false,
};

export default Toggle;
