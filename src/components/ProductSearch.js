import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ setSearchTerm }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const { isDarkTheme } = useContext(ThemeContext);
    // TODO: Exercice 2.1 - Utiliser le LanguageContext
    const debouncedSearchTerm = useDebounce(localSearchTerm, 500);

    // TODO: Exercice 1.2 - Utiliser le hook useDebounce
    React.useEffect(() => {
        setSearchTerm(debouncedSearchTerm);
    }, [debouncedSearchTerm, setSearchTerm]);

    return (
        <div className="mb-4">
            <input
                type="text"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                placeholder="Rechercher un produit..."
                className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
            />
        </div>
    );
};

export default ProductSearch;