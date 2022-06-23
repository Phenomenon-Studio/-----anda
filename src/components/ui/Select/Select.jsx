import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import clsx from 'clsx';
import classes from './Select.module.css';

const Select = props => {
    const { options, onChange, id, instanceId, additionalClasses = '', selectedOptionIndex, ...rest } = props;
    const [selectedOption, setSelectedOption] = useState(options[selectedOptionIndex]);

    const selectChangeHandler = data => {
        if (data.value === selectedOption.value) {
            return;
        }

        setSelectedOption(data);

        if (typeof onChange === 'function') {
            onChange(data.value);
        }
    };

    const openMenuHandler = () => {
        const $wrap = document.querySelector(`#${id}`);
        const $arrow = $wrap?.querySelector('div[class$="indicatorContainer"] > svg');

        $arrow?.classList?.add('opened');
    };

    const closeMenuHandler = () => {
        const $listBox = document.querySelector(`#react-select-${id}-listbox`);
        const $select = $listBox?.parentElement;
        const $clonedListBox = $listBox?.cloneNode(true);
        const $arrow = $select?.querySelector('div[class$="indicatorContainer"] > svg.opened');

        if (!$clonedListBox) {
            return;
        }

        $arrow?.classList?.remove('opened');
        $clonedListBox?.classList?.add('menu-close');
        $clonedListBox.addEventListener('animationend', () => {
            $select?.removeChild($clonedListBox);
        });

        $select?.appendChild($clonedListBox);
    };

    return (
        <ReactSelect
            className={clsx(classes.select, additionalClasses)}
            id={id}
            instanceId={instanceId}
            inputId={instanceId}
            value={selectedOption}
            onChange={selectChangeHandler}
            options={options}
            onMenuClose={closeMenuHandler}
            onMenuOpen={openMenuHandler}
            {...rest}
        />
    );
};

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    instanceId: PropTypes.string.isRequired,
    additionalClasses: PropTypes.string,
    selectedOptionIndex: PropTypes.number.isRequired,
};

export default memo(Select);
