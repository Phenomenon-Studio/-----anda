import { memo } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import { useFocusAndBlurTextField } from '@hooks';
import classes from './SettingsInput.module.css';

const SettingsInput = ({ value, additionalClasses, ...inputAttrs }) => {
    const [focusedClassName, completedClassName, focusHandler, blurHandler] = useFocusAndBlurTextField(
        value,
        classes.focused,
        classes.completed
    );

    return (
        <div className={clsx(classes.wrap, additionalClasses, focusedClassName, completedClassName)}>
            <NumberFormat
                className={classes.input}
                value={value}
                onFocus={focusHandler}
                onBlur={blurHandler}
                allowNegative={false}
                {...inputAttrs}
            />
        </div>
    );
};

SettingsInput.propTypes = {
    value: PropTypes.string.isRequired,
    additionalClasses: PropTypes.string,
};

export default memo(SettingsInput);
