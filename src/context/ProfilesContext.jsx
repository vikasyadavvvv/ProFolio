import React, { createContext, useContext, useMemo, useState } from 'react';
import { loadProfiles, saveProfiles } from '../utils/storage';

const ProfilesContext = createContext();

export function ProfilesProvider({ children }){
  const [profiles, setProfiles] = useState(loadProfiles());
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  function addProfile(profile){
    const id = String(Date.now());
    const next = [...profiles, { ...profile, id }];
    setProfiles(next);
    saveProfiles(next);
    return id;
  }

  function updateProfile(id, patch){
    const next = profiles.map(p => p.id === id ? { ...p, ...patch } : p);
    setProfiles(next);
    saveProfiles(next);
  }

  function getById(id){
    return profiles.find(p => p.id === id);
  }

  const value = useMemo(() => ({
    profiles, addProfile, updateProfile, getById,
    selectedTemplate, setSelectedTemplate,
  }), [profiles, selectedTemplate]);

  return <ProfilesContext.Provider value={value}>{children}</ProfilesContext.Provider>;
}

export function useProfiles(){
  return useContext(ProfilesContext);
}
