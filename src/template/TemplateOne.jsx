import React from "react";

function TemplateOne({ data = {} }) {
  // Provide default empty object if data is undefined
  const safeData = {
    hero: {},
    about: {},
    skills: [],
    services: [],
    projects: [],
    testimonials: [],
    blog: {},
    contact: {},
    ...data
  };

  const socials = (safeData.about?.socials || '').split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="space-y-8 bg-white">
      {/* Hero Section - Only show if hero data exists */}
      {safeData.hero && (
        <section className="bg-red-600 text-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row items-center gap-6">
            <img 
              src={safeData.hero?.image || 'https://cdn.vectorstock.com/i/1000v/15/32/colorful-profile-picture-placeholder-icon-vector-42411532.jpg'} 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
              alt={safeData.hero?.name || 'Profile image'}
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{safeData.hero?.name || 'Your Name'}</h1>
              <p className="text-red-100 mt-1">{safeData.hero?.title || 'Professional Title'}</p>
              {safeData.hero?.tagline && <p className="mt-3 text-red-50">{safeData.hero.tagline}</p>}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <Section title="About Me" borderColor="border-red-200">
        <p className="text-gray-700">{safeData.about?.bio || 'Add your bio here'}</p>
        <div className="mt-4 space-y-2">
          {safeData.about?.email && (
            <div className="flex items-center text-gray-700">
              <span className="w-6 text-red-500">✉️</span> {safeData.about.email}
            </div>
          )}
          {safeData.about?.phone && (
            <div className="flex items-center text-gray-700">
              <span className="w-6 text-red-500">📱</span> {safeData.about.phone}
            </div>
          )}
          {safeData.about?.location && (
            <div className="flex items-center text-gray-700">
              <span className="w-6 text-red-500">📍</span> {safeData.about.location}
            </div>
          )}
          {socials.length > 0 && (
            <div className="flex items-start">
              <span className="w-6 text-red-500">🔗</span>
              <div className="flex flex-wrap gap-2">
                {socials.map((s, i) => (
                  <a key={i} href={s} className="text-red-600 hover:text-red-800 underline" target="_blank" rel="noopener noreferrer">
                    {s.split('/')[2]?.replace('www.', '')}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Skills Section - Only show if skills exist */}
      {safeData.skills?.length > 0 && (
        <Section title="My Skills" borderColor="border-red-200">
          <div className="flex flex-wrap gap-2">
            {safeData.skills.map((s, idx) => (
              <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {s}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Services Section - Only show if services exist */}
      {safeData.services?.length > 0 && (
        <Section title="My Services" borderColor="border-red-200">
          <div className="grid md:grid-cols-3 gap-4">
            {safeData.services.map((s, idx) => (
              <div key={idx} className="border border-red-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-red-700">{s.title || 'Service Title'}</h4>
                <p className="text-gray-700 mt-2">{s.desc || 'Service description'}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Portfolio Section - Only show if projects exist */}
      {safeData.projects?.length > 0 && (
        <Section title="Portfolio" borderColor="border-red-200">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeData.projects.map((p, idx) => (
              <div key={idx} className="border border-red-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {p.image && <img src={p.image} className="w-full h-48 object-cover" alt={p.title || 'Project'} />}
                <div className="p-4">
                  <h4 className="font-semibold text-red-700">{p.title || 'Project Title'}</h4>
                  <p className="text-gray-700 text-sm mt-2">{p.desc || 'Project description'}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials Section - Only show if testimonials exist */}
      {safeData.testimonials?.length > 0 && (
        <Section title="Testimonials" borderColor="border-red-200">
          <div className="grid md:grid-cols-2 gap-4">
            {safeData.testimonials.map((t, idx) => (
              <div key={idx} className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                <blockquote className="text-gray-700 italic">"{t.quote || 'Testimonial quote'}"</blockquote>
                <figcaption className="mt-3 font-medium text-red-700">— {t.author || 'Author'}</figcaption>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Blog Section - Only show if blog exists */}
      {safeData.blog?.title && (
        <Section title="Blog" borderColor="border-red-200">
          <h3 className="text-xl font-semibold text-red-700">{safeData.blog.title}</h3>
          <p className="text-gray-700 mt-2">{safeData.blog.summary}</p>
        </Section>
      )}

      {/* Contact Section */}
      <Section title="Contact Me" borderColor="border-red-200">
        {safeData.contact?.message && <p className="text-gray-700">{safeData.contact.message}</p>}
        <div className="mt-4 space-y-2">
          {safeData.contact?.email && (
            <div className="flex items-center text-gray-700">
              <span className="w-6 text-red-500">✉️</span> {safeData.contact.email}
            </div>
          )}
          {safeData.contact?.phone && (
            <div className="flex items-center text-gray-700">
              <span className="w-6 text-red-500">📱</span> {safeData.contact.phone}
            </div>
          )}
        </div>
      </Section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t border-red-100">
        © {new Date().getFullYear()} {safeData.hero?.name || 'Your Name'} • All Rights Reserved
      </footer>
    </div>
  );
}

function Section({ title, children, borderColor = "border-red-200" }) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4 pb-2 border-b-2 border-red-300">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default TemplateOne;