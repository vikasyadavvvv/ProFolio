import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfilesContext';
import { 
  FiUser, FiBriefcase, FiAward, FiSettings, FiFileText, 
  FiMail, FiPhone, FiMapPin, FiLink, FiX, FiPlus, 
  FiArrowLeft, FiArrowRight, FiSave, FiEdit2, FiLayers
} from 'react-icons/fi';

const empty = {
  template: 'template1',
  hero: { name:'', title:'', tagline:'', image:'' },
  about: { bio:'', email:'', phone:'', location:'', socials:'' },
  skills: [],
  services: [{title:'',desc:''},{title:'',desc:''},{title:'',desc:''}],
  projects: [{title:'',image:'',desc:''},{title:'',image:'',desc:''},{title:'',image:'',desc:''}],
  testimonials: [{quote:'', author:''}],
  blog: { title:'', summary:'' },
  contact: { message:'', email:'', phone:'' }
};

export default function CreateProfile(){
  const { id: routeId } = useParams();
  const { selectedTemplate, addProfile, getById, updateProfile } = useProfiles();
  const navigate = useNavigate();
  const editing = Boolean(routeId);
  const [data, setData] = useState({ ...empty, template: selectedTemplate });

  useEffect(()=>{
    if(editing){
      const existing = getById(routeId);
      if(existing) setData(existing);
    } else {
      setData(prev => ({...prev, template: selectedTemplate }));
    }
  }, [routeId]);

  function save(){
    if(editing){
      updateProfile(routeId, data);
      navigate('/professionals');
    }else{
      addProfile(data);
      navigate('/professionals');
    }
  }

  const sections = [
    { key:'hero', label:'Hero', icon: <FiUser className="mr-2" />, view: <HeroSection data={data} setData={setData} />},
    { key:'about', label:'About', icon: <FiUser className="mr-2" />, view: <AboutSection data={data} setData={setData} />},
    { key:'skills', label:'Skills', icon: <FiAward className="mr-2" />, view: <SkillsSection data={data} setData={setData} />},
    { key:'services', label:'Services', icon: <FiSettings className="mr-2" />, view: <ServicesSection data={data} setData={setData} />},
    { key:'projects', label:'Portfolio', icon: <FiLayers className="mr-2" />, view: <ProjectsSection data={data} setData={setData} />},
    { key:'testimonials', label:'Testimonials', icon: <FiBriefcase className="mr-2" />, view: <TestimonialsSection data={data} setData={setData} />},
    { key:'blog', label:'Blog', icon: <FiFileText className="mr-2" />, view: <BlogSection data={data} setData={setData} />},
    { key:'contact', label:'Contact', icon: <FiMail className="mr-2" />, view: <ContactSection data={data} setData={setData} />},
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6 border-b border-red-100 pb-4">
          <h2 className="text-2xl font-bold text-red-700 flex items-center">
            {editing ? <FiEdit2 className="mr-2" /> : <FiPlus className="mr-2" />}
            {editing ? 'Edit Profile' : 'Create Profile'}
          </h2>
          <span className="ml-auto text-sm text-gray-600 bg-red-50 px-3 py-1 rounded-full flex items-center">
            <FiLayers className="mr-1" /> Template: <b className="ml-1 text-red-700">{data.template}</b>
          </span>
        </div>

        {/* Section Navigation (Tabs) */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {sections.map((s,idx)=>(
            <button 
              key={s.key} 
              onClick={()=>setActive(idx)}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap flex items-center transition-colors ${
                idx===active 
                  ? "bg-red-600 text-white shadow-md" 
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          {sections[active].view}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
          <div className="flex gap-2">
            <button 
              onClick={()=>setActive(Math.max(0, active-1))} 
              disabled={active === 0}
              className="btn-outline-red flex items-center disabled:opacity-50"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>
            <button 
              onClick={()=>setActive(Math.min(sections.length-1, active+1))} 
              disabled={active === sections.length - 1}
              className="btn-outline-red flex items-center disabled:opacity-50"
            >
              Next <FiArrowRight className="ml-2" />
            </button>
          </div>
          <button 
            onClick={save} 
            className="btn-red flex items-center justify-center"
          >
            <FiSave className="mr-2" /> {editing ? 'Update Profile' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Styled Input Components with Icons
function Input({ label, value, onChange, type='text', placeholder='', icon, className='' }){
  const Icon = icon;
  return (
    <label className={`block mb-4 ${className}`}>
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input 
          type={type} 
          value={value} 
          onChange={e=>onChange(e.target.value)} 
          placeholder={placeholder} 
          className={`w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </label>
  )
}

function Textarea({ label, value, onChange, placeholder='', icon, className='' }){
  const Icon = icon;
  return (
    <label className={`block mb-4 ${className}`}>
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <div className="relative">
        {icon && (
          <div className="absolute top-3 left-3 text-gray-400">
            {icon}
          </div>
        )}
        <textarea 
          value={value} 
          onChange={e=>onChange(e.target.value)} 
          placeholder={placeholder} 
          className={`w-full rounded-lg border border-gray-300 px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 ${
            icon ? 'pl-10' : ''
          } ${className}`}
        ></textarea>
      </div>
    </label>
  )
}

// Section Components
function HeroSection({ data, setData }){
  const d = data.hero;
  return (
    <div className="grid md:grid-cols-2 gap-6">
     <Input 
  label="Full Name" 
  value={d.name} 
  onChange={v => setData({...data, hero: {...d, name: v}})} 
  icon={<FiUser size={16} />}
/>
<Input 
  label="Professional Title" 
  value={d.title} 
  onChange={v => setData({...data, hero: {...d, title: v}})} 
  icon={<FiBriefcase size={16} />}
/>
      <div className="md:col-span-2">
        <Input 
          label="Tagline" 
          value={d.tagline} 
          onChange={v=>setData({...data, hero:{...d, tagline:v}})} 
          placeholder="A short professional tagline"
        />
      </div>
      <div className="md:col-span-2">
        <Input 
          label="Profile Image URL" 
          value={d.image} 
          onChange={v=>setData({...data, hero:{...d, image:v}})} 
          placeholder="https://example.com/your-photo.jpg"
          icon={<FiLink size={16} />}
        />
      </div>
    </div>
  )
}

function AboutSection({ data, setData }){
  const d = data.about;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <Textarea 
          label="Professional Bio" 
          value={d.bio} 
          onChange={v=>setData({...data, about:{...d, bio:v}})} 
          placeholder="Tell us about yourself and your professional journey"
        />
      </div>
      <Input 
        label="Email" 
        value={d.email} 
        onChange={v=>setData({...data, about:{...d, email:v}})} 
        type="email" 
        icon={<FiMail size={16} />}
      />
      <Input 
        label="Phone" 
        value={d.phone} 
        onChange={v=>setData({...data, about:{...d, phone:v}})} 
        type="tel" 
        icon={<FiPhone size={16} />}
      />
      <Input 
        label="Location" 
        value={d.location} 
        onChange={v=>setData({...data, about:{...d, location:v}})} 
        icon={<FiMapPin size={16} />}
      />
      <div className="md:col-span-2">
        <Input 
          label="Social Links (comma separated)" 
          value={d.socials} 
          onChange={v=>setData({...data, about:{...d, socials:v}})} 
          placeholder="https://linkedin.com/you, https://twitter.com/you"
          icon={<FiLink size={16} />}
        />
      </div>
    </div>
  )
}

function SkillsSection({ data, setData }){
  const [input, setInput] = useState('');
  const add = ()=>{
    if(!input.trim()) return;
    setData({...data, skills:[...data.skills, input.trim()]});
    setInput('');
  }
  const remove = (idx)=>{
    const list = data.skills.filter((_,i)=>i!==idx);
    setData({...data, skills:list});
  }
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input 
          value={input} 
          onChange={e=>setInput(e.target.value)} 
          placeholder="Add a skill and press Add" 
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
          onKeyPress={(e)=> e.key === 'Enter' && add()}
        />
        <button 
          onClick={add} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FiPlus className="mr-1" /> Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((s,idx)=>(
          <span 
            key={idx} 
            className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm flex items-center"
          >
            {s} 
            <button 
              onClick={()=>remove(idx)} 
              className="ml-1 text-red-500 hover:text-red-700"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

function ServicesSection({ data, setData }){
  const list = data.services;
  const update = (i, patch)=>{
    const next = list.map((s,idx)=> idx===i ? {...s, ...patch} : s);
    setData({...data, services: next});
  }
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {list.map((s,idx)=>(
        <div key={idx} className="bg-red-50 rounded-lg p-4 border border-red-100">
          <Input 
            label="Service Title" 
            value={s.title} 
            onChange={v=>update(idx,{title:v})} 
            className="mb-3"
          />
          <Textarea 
            label="Description" 
            value={s.desc} 
            onChange={v=>update(idx,{desc:v})} 
            className="mb-0"
          />
        </div>
      ))}
    </div>
  )
}

function ProjectsSection({ data, setData }){
  const list = data.projects;
  const update = (i, patch)=>{
    const next = list.map((s,idx)=> idx===i ? {...s, ...patch} : s);
    setData({...data, projects: next});
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map((s,idx)=>(
        <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <Input 
            label="Project Title" 
            value={s.title} 
            onChange={v=>update(idx,{title:v})} 
            className="mb-3"
          />
          <Input 
            label="Image URL" 
            value={s.image} 
            onChange={v=>update(idx,{image:v})} 
            className="mb-3"
            icon={<FiLink size={16} />}
          />
          <Textarea 
            label="Description" 
            value={s.desc} 
            onChange={v=>update(idx,{desc:v})} 
            className="mb-0"
          />
        </div>
      ))}
    </div>
  )
}

function TestimonialsSection({ data, setData }){
  const list = data.testimonials;
  const update = (i, patch)=>{
    const next = list.map((s,idx)=> idx===i ? {...s, ...patch} : s);
    setData({...data, testimonials: next});
  }
  const add = ()=> setData({...data, testimonials:[...list, {quote:'', author:''}]});
  const remove = (idx)=> setData({...data, testimonials: list.filter((_,i)=>i!==idx)});
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        {list.map((t,idx)=>(
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <Textarea 
              label="Testimonial Quote" 
              value={t.quote} 
              onChange={v=>update(idx,{quote:v})} 
              className="mb-3"
            />
            <Input 
              label="Author Name" 
              value={t.author} 
              onChange={v=>update(idx,{author:v})} 
              className="mb-3"
            />
            {list.length>1 && (
              <button 
                onClick={()=>remove(idx)} 
                className="text-red-600 hover:text-red-800 text-sm flex items-center"
              >
                <FiX className="mr-1" /> Remove Testimonial
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button 
          onClick={add} 
          className="text-red-600 hover:text-red-800 flex items-center"
        >
          <FiPlus className="mr-1" /> Add Testimonial
        </button>
      </div>
    </div>
  )
}

function BlogSection({ data, setData }){
  const d = data.blog;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Input 
        label="Blog Title" 
        value={d.title} 
        onChange={v=>setData({...data, blog:{...d, title:v}})} 
      />
      <Textarea 
        label="Summary (optional)" 
        value={d.summary} 
        onChange={v=>setData({...data, blog:{...d, summary:v}})} 
      />
    </div>
  )
}

function ContactSection({ data, setData }){
  const d = data.contact;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <Textarea 
          label="Contact Message" 
          value={d.message} 
          onChange={v=>setData({...data, contact:{...d, message:v}})} 
          placeholder="A welcome message for your contact section"
        />
      </div>
      <Input 
        label="Contact Email" 
        value={d.email} 
        onChange={v=>setData({...data, contact:{...d, email:v}})} 
        type="email" 
        icon={<FiMail size={16} />}
      />
      <Input 
        label="Contact Phone" 
        value={d.phone} 
        onChange={v=>setData({...data, contact:{...d, phone:v}})} 
        type="tel" 
        icon={<FiPhone size={16} />}
      />
    </div>
  )
}
