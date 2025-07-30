// src/pages/TemplateSelect.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfilesContext';
import { FiCheckCircle, FiEye } from 'react-icons/fi';

export default function TemplateSelect() {
  const { selectedTemplate, setSelectedTemplate } = useProfiles();
  const navigate = useNavigate();

  const go = (tpl) => {
    setSelectedTemplate(tpl);
    navigate('/create');
  };

  return (
    <div className="mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
          Choose Your <span className="text-red-600">Template</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-700">
          Select a professional template that best represents your style and needs.
        </p>

        {/* red underline accent */}
        <span className="mt-4 inline-block h-1 w-24 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
        <TemplateCard
          title="Template 1"
          features={['Bold hero section', 'Grid portfolio', 'Testimonials carousel']}
          selected={selectedTemplate === 'template1'}
          onCustomize={() => go('template1')}
          img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
        />
        <TemplateCard
          title="Template 2"
          features={['Split hero layout', 'Timeline skills', 'Blog section']}
          selected={selectedTemplate === 'template2'}
          onCustomize={() => go('template2')}
          img="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
        />
      </div>
    </div>
  );
}

function TemplateCard({ title, features, selected, onCustomize, img }) {
  return (
    <div
      className={[
        'group overflow-hidden rounded-2xl border bg-white shadow-soft transition',
        'hover:-translate-y-0.5 hover:shadow-md',
        selected ? 'border-red-600 ring-2 ring-red-500/30' : 'border-neutral-200',
      ].join(' ')}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={img}
          alt={`${title} preview`}
          className="w-full h-40 sm:h-52 lg:h-60 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {selected && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            <FiCheckCircle className="text-[14px]" />
            Selected
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-black">{title}</h3>

        {/* Features */}
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
              <span className="text-neutral-700">{f}</span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-5 flex flex-col xs:flex-row gap-2">
          <button
            onClick={onCustomize}
            className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Use this template
          </button>
          <button
            onClick={() => window.alert('Preview coming soon')}
            className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          >
            <FiEye className="text-base" />
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
