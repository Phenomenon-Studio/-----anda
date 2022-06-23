import { memo } from 'react';
import PropTypes from 'prop-types';
import { ALLOWED_DECIMAL_SEPARATORS } from '@constants';
import Button from '@components/ui/Button';
import InfoMessage from '@components/ui/InfoMessage';
import SettingsInput from '../SettingsInput';
import classes from './SlippageTolerance.module.css';

const infoStyles = {
    '--color-alert': 'var(--color-gray-300)',
};

const SlippageTolerance = ({ data, setData }) => {
    const setAutoHandler = () => {
        if (data.value.replace('%', '') === data.defaultValue) {
            return;
        }

        setData(prevState => ({
            ...prevState,
            value: `${prevState.defaultValue}%`,
        }));
    };

    const changeHandler = e => {
        setData(prevState => ({
            ...prevState,
            value: e.target.value,
        }));
    };

    return (
        <>
            <div className={classes.header}>
                <SettingsInput
                    value={data.value}
                    decimalScale={1}
                    additionalClasses={classes.input}
                    suffix="%"
                    onChange={changeHandler}
                    inputMode="decimal"
                    allowedDecimalSeparators={ALLOWED_DECIMAL_SEPARATORS}
                />
                <Button
                    tagName="button"
                    size="mini"
                    variant="bordered-gradient"
                    additionalClasses={classes.btn}
                    onClick={setAutoHandler}
                >
                    <span>Auto</span>
                </Button>
            </div>
            <InfoMessage text="Your transaction may be frontrun" style={infoStyles} />
        </>
    );
};

SlippageTolerance.propTypes = {
    data: PropTypes.shape({
        value: PropTypes.string.isRequired,
        defaultValue: PropTypes.string.isRequired,
    }).isRequired,
    setData: PropTypes.func.isRequired,
};

export default memo(SlippageTolerance);
