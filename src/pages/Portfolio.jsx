import React from 'react';
import { useParams } from 'react-router-dom';
import { useProfiles } from '../context/ProfilesContext.jsx';
import TemplateOne from '../template/TemplateOne.jsx';
import TemplateTwo from '../template/TemplateTwo.jsx';

export default function Portfolio(){
  const { id } = useParams();
  const { getById } = useProfiles();
  const data = getById(id);

  if(!data) return <div className="text-center text-gray-600">Profile not found.</div>;

  if(data.template === 'template2'){
    return <TemplateTwo data={data} />;
  }
  return <TemplateOne data={data} />;
}
