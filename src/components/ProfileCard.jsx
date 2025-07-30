import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiEdit2, FiExternalLink, FiAward, FiBriefcase } from 'react-icons/fi';

export default function ProfileCard({ p, className = '', style = {} }) {
  return (
    <div 
      className={`flex flex-col p-6 rounded-xl shadow-md transition-all hover:shadow-lg ${className}`}
      style={{
        background: 'linear-gradient(to bottom, #fef9c3, #ffffff)',
        border: '1px solid #fbbf24',
        minHeight: '400px',
        ...style
      }}
    >
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img 
            src={p.hero?.image || 'https://cdn.vectorstock.com/i/1000v/15/32/colorful-profile-picture-placeholder-icon-vector-42411532.jpg'} 
            alt={p.hero?.name} 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-yellow-500"
          />
          <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white p-1 rounded-full">
            <FiUser size={14} />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            {p.hero?.name || 'Unnamed Professional'}
          </h3>
          <p className="text-yellow-700 flex items-center gap-1 mt-1">
            <FiBriefcase size={14} />
            {p.hero?.title || 'No title specified'}
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-4 flex-1">
        <p className="text-gray-700 line-clamp-4">
          {p.about?.bio || 'No bio available for this professional.'}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
          <FiAward className="text-yellow-600" /> Key Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {(p.skills || []).slice(0, 6).map((s, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center"
            >
              {s}
            </span>
          ))}
          {(!p.skills || p.skills.length === 0) && (
            <span className="text-xs text-gray-500">No skills listed</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto grid grid-cols-2 gap-3">
        <Link 
          to={`/portfolio/${p.id}`} 
          className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <FiExternalLink size={16} /> View
        </Link>
        <Link 
          to={`/edit/${p.id}`} 
          state={{ id: p.id }}
          className="flex items-center justify-center gap-2 border border-yellow-600 text-yellow-700 hover:bg-yellow-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <FiEdit2 size={16} /> Edit
        </Link>
      </div>
    </div>
  );
}
