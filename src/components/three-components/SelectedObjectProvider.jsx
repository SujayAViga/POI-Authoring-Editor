import axios from 'axios';
import { createContext, useState } from 'react';

const SelectedObjectContext = createContext();

const SelectedObjectProvider = ({ children }) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [splatUrls, setSplatUrls] = useState('');
  const [objectId, setObjectId] = useState(0)
  const [locale, setLocale] = useState()
  const [authToken, setAuthToken] = useState()
  const api = axios.create({
    baseURL: "https://us-central1-poi-application.cloudfunctions.net/webApp/"
  })

  const contextValue = {
    api,
    authToken,
    setAuthToken,
    locale,
    setLocale,
    objectId,
    setObjectId,
    selectedObject,
    setSelectedObject,
    splatUrls,
    setSplatUrls,
  };

  return <SelectedObjectContext.Provider value={contextValue}>{children}</SelectedObjectContext.Provider>;
};

export { SelectedObjectProvider, SelectedObjectContext };