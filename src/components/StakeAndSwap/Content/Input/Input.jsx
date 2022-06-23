import { memo } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useFocusAndBlurTextField } from '@hooks';
import { ALLOWED_DECIMAL_SEPARATORS } from '@constants';
import InfoMessage from '@components/ui/InfoMessage';
import classes from './Input.module.css';

const errorMessageStyle = {
    '--paddings-x': '16px',
};

const Input = ({ data, additionalClasses, headerText, value, hasError = false, balance = '', errorMessage = '', ...inputAttrs }) => {
    const [focusedClassName, completedClassName, focusHandler, blurHandler] = useFocusAndBlurTextField(
        value,
        classes.focused,
        classes.completed,
        inputAttrs.disabled
    );

    return (
        <>
            <div className={clsx(classes.wrap, additionalClasses, focusedClassName, completedClassName)}>
                <div className={classes.header}>
                    <div className={classes.label}>
                        {data.icon ? (
                            <svg>
                                <use xlinkHref={data.icon} />
                            </svg>
                        ) : data.icons ? (
                            data.icons.map(icon => (
                                <svg key={icon}>
                                    <use xlinkHref={icon} />
                                </svg>
                            ))
                        ) : null}
                        <span>{data.name}</span>
                    </div>
                    {headerText && <div className={classes.headerText}>{headerText}</div>}
                </div>
                <div className={classes.body}>
                    <NumberFormat
                        inputMode="decimal"
                        allowedDecimalSeparators={ALLOWED_DECIMAL_SEPARATORS}
                        className={classes.input}
                        value={value}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        allowNegative={false}
                        {...inputAttrs}
                    />
                    <div className={classes.bodyText}>
                        <span>Balance:</span>
                        <span>{balance}</span>
                    </div>
                </div>
            </div>
            {hasError && errorMessage && <InfoMessage text={errorMessage} style={errorMessageStyle} />}
        </>
    );
};

Input.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        icons: PropTypes.arrayOf(PropTypes.string.isRequired),
        amount: PropTypes.number.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    additionalClasses: PropTypes.string,
    headerText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    balance: PropTypes.string,
};

export default memo(Input);
