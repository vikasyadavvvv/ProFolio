import React from 'react';
import { useMemo, useState } from 'react';
import { useProfiles } from '../context/ProfilesContext';
import ProfileCard from '../components/ProfileCard';
import { FiSearch, FiBriefcase, FiAward, FiX, FiUsers } from 'react-icons/fi';

export default function Professionals() {
  const { profiles } = useProfiles();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');
  const [skill, setSkill] = useState('');

  const roles = Array.from(new Set(profiles.map(p => p.hero?.title).filter(Boolean)))
  const skills = Array.from(new Set(profiles.flatMap(p => p.skills || []).filter(Boolean)))

  const filtered = useMemo(() => {
    return profiles.filter(p => {
      const matchName = p.hero?.name?.toLowerCase().includes(query.toLowerCase());
      const matchRole = role ? (p.hero?.title === role) : true;
      const matchSkill = skill ? (p.skills || []).includes(skill) : true;
      return matchName && matchRole && matchSkill;
    });
  }, [profiles, query, role, skill]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <FiUsers className="text-3xl text-white" />
          <h1 className="text-3xl font-bold text-white">Meet Our Professionals</h1>
        </div>
        <p className="text-yellow-100">Discover the experts shaping the future of drone technology</p>
        
        {/* Search and Filters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-yellow-600" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search professionals..."
              className="w-full rounded-xl pl-10 pr-3 py-2 border border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          
          <div className="relative">
            <FiBriefcase className="absolute left-3 top-3 text-yellow-600" />
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full rounded-xl pl-10 pr-3 py-2 border border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none"
            >
              <option value="">All Roles</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          
          <div className="relative">
            <FiAward className="absolute left-3 top-3 text-yellow-600" />
            <select
              value={skill}
              onChange={e => setSkill(e.target.value)}
              className="w-full rounded-xl pl-10 pr-3 py-2 border border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none"
            >
              <option value="">All Skills</option>
              {skills.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <button
            onClick={() => { setQuery(''); setRole(''); setSkill('') }}
            className="flex items-center justify-center gap-2 bg-black text-yellow-400 hover:bg-gray-900 px-4 py-2 rounded-xl transition-colors"
          >
            <FiX /> Reset Filters
          </button>
        </div>
      </div>

      {/* Results Section */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600 py-12 bg-yellow-50 rounded-xl">
          No matching profiles found. Try different filters or create a new profile.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProfileCard 
              key={p.id} 
              p={p} 
              className="h-full"
              style={{
                minHeight: '400px', // Makes cards more rectangular
                background: 'linear-gradient(to bottom, #fef9c3, #ffffff)',
                border: '1px solid #fbbf24',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
