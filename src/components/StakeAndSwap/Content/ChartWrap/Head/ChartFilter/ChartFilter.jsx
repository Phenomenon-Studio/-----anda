import { memo } from 'react';
import PropTypes from 'prop-types';
import { CHART_X_AXIS_24H, CHART_X_AXIS_1M, CHART_X_AXIS_1W, CHART_X_AXIS_1Y } from '@constants';
import ButtonGroup from '../../../ButtonGroup';
import classes from './ChartFilter.module.css';

const btnGroupList = [
    { name: CHART_X_AXIS_24H },
    { name: CHART_X_AXIS_1W },
    { name: CHART_X_AXIS_1M },
    { name: CHART_X_AXIS_1Y },
];

const ChartFilter = ({ active, setActive, disabledButtons }) => {
    return (
        <ButtonGroup
            list={btnGroupList}
            active={active}
            setActive={setActive}
            additionalClasses={classes.buttons}
            disabled={disabledButtons}
        />
    );
};

ChartFilter.propTypes = {
    active: PropTypes.string.isRequired,
    setActive: PropTypes.func.isRequired,
    disabledButtons: PropTypes.bool.isRequired,
};

export default memo(ChartFilter);
