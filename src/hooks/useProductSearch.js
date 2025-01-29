import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
import useDebounce from './useDebounce';

// TODO: Exercice 3.2 - Créer le hook useLocalStorage
import useLocalStorage from './useLocalStorage';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadCount, setReloadCount] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const response = await fetch(
            `https://api.daaif.net/products?q=${debouncedSearchTerm}&page=${currentPage}&size=10&delay=1000`
        );
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm, currentPage, reloadCount]);
  // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reload = () => setReloadCount((prev) => prev + 1);

  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reload,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
};

export default useProductSearch;