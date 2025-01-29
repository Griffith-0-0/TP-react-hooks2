# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Instructions pour le TP


### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

- [ ] 1.1 Modifier le composant ProductSearch pour utiliser la recherche

Dans ProductSearch.js, nous avons ajouté un champ de recherche qui met à jour un état local localSearchTerm. Ce terme est ensuite passé à la fonction setSearchTerm via un effet React.
```  
const [localSearchTerm, setLocalSearchTerm] = useState('');
useEffect(() => {
setSearchTerm(debouncedSearchTerm);
}, [debouncedSearchTerm, setSearchTerm]);
```
- [ ] 1.2 Implémenter le debounce sur la recherche

Nous utilisons le hook useDebounce pour retarder la mise à jour du terme de recherche afin d'éviter des appels répétitifs à l'API.
```
const debouncedSearchTerm = useDebounce(localSearchTerm, 500);
```
L'ajout du debounce permet d'attendre 500ms après la dernière frappe de l'utilisateur avant d'effectuer une requête. Cela réduit le nombre d'appels API inutiles.

### Exercice 2 : Context et Internationalisation
#### Objectif : Gérer les préférences de langue

- [ ] 2.1 Créer le LanguageContext

Dans App.js, nous avons défini un LanguageContext qui stocke la langue actuelle.
```
export const LanguageContext = createContext();
const [language, setLanguage] = useState('fr');
```
- [ ] 2.2 Ajouter le sélecteur de langue

Le composant de sélection de langue permet à l'utilisateur de choisir entre français et anglais.
```
<select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
>
    <option value="fr">Français</option>
    <option value="en">English</option>
</select>
```
L'utilisation de LanguageContext permet à tous les composants d'accéder à la langue actuelle et de réagir aux changements dynamiques.

### Exercice 3 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [ ] 3.1 Créer le hook useDebounce

Le hook useDebounce permet de décaler l'exécution d'une mise à jour de valeur après un certain délai.
```
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};
```
- [ ] 3.2 Créer le hook useLocalStorage

Ce hook sauvegarde et récupère des données dans localStorage pour les préserver entre les sessions.
```
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved !== null ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
```
Ces hooks permettent d'améliorer la réactivité de l'application en évitant des recalculs inutiles et en conservant les données utilisateurs de manière persistante.

### Exercice 4 : Gestion Asynchrone et Pagination
#### Objectif : Gérer le chargement et la pagination

- [ ] 4.1 Ajouter le bouton de rechargement

Dans ProductList.js, nous avons ajouté un bouton pour forcer le rechargement des produits.
```
<button onClick={reload} className="btn btn-primary mb-3">
    {language === 'fr' ? 'Recharger' : 'Reload'}
</button>
```
- [ ] 4.2 Implémenter la pagination

Nous avons ajouté un système de pagination dans useProductSearch.js.
```
const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
```
L'ajout de la pagination permet d'afficher un nombre limité de produits à la fois et d'améliorer l'expérience utilisateur en évitant un trop grand volume d'informations affichées en une seule fois.