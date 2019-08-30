import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import MenuItem from './MenuItem';

const SearchComponent = (props) => {
    const {id, labelKey, defaultSelected, onChange, minLength, placeholder, disabled, filterBy, onSearch} = props;
    const [isLoading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    /*
    handleSearch() handleSearch based on React Bootstrap Typeahead component
    @params(String) query
    */
    const handleSearch = (query) => {
        setLoading(true);
        onSearch(query)
            .then((data) => {
                setOptions(data);
                setLoading(false);
            });
    };

    return (
        <AsyncTypeahead
            isLoading={isLoading}
            options={options}
            allowNew={false}
            multiple={false}
            id={id}
            labelKey={labelKey}
            filterBy={filterBy}
            defaultSelected={defaultSelected}
            onChange={onChange}
            minLength={minLength}
            onSearch={handleSearch}
            placeholder={placeholder}
            disabled={disabled}
            renderMenuItemChildren={(option) => (
                <MenuItem key={option.id} item={option}/>
            )}
        />
    );
};

SearchComponent.propTypes = {
    id: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    defaultSelected: PropTypes.arrayOf(PropTypes.shape()),
    onChange: PropTypes.func.isRequired,
    minLength: PropTypes.number,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    filterBy: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string, PropTypes.string)]).isRequired
};

SearchComponent.defaultProps = {
    defaultSelected: undefined,
    minLength: 1,
    placeholder: "",
    disabled: false,
};
export default SearchComponent