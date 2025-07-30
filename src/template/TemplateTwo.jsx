import React from 'react'
 function TemplateTwo({ data }){
  const socials = (data?.about?.socials || '').split(',').map(s=>s.trim()).filter(Boolean);
  return (
    <div className="space-y-10">
      <section className="rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 bg-white">
          <div className="p-6 flex items-center">
            <div>
              <h1 className="text-4xl font-extrabold">{data.hero?.name}</h1>
              <p className="text-brand-500 font-semibold">{data.hero?.title}</p>
              <p className="mt-2 text-gray-700">{data.hero?.tagline}</p>
            </div>
          </div>
          <div className="bg-gray-200">
            <img src={data.hero?.image || 'https://cdn.vectorstock.com/i/1000v/15/32/colorful-profile-picture-placeholder-icon-vector-42411532.jpg'} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <Section title="About">
        <div className="grid md:grid-cols-3 gap-6">
          <p className="md:col-span-2 text-gray-700">{data.about?.bio}</p>
          <div className="card">
            <div className="space-y-1 text-sm">
              <div>📧 {data.about?.email}</div>
              <div>📞 {data.about?.phone}</div>
              <div>📍 {data.about?.location}</div>
              {socials.length>0 && <div>🔗 {socials.map((s,i)=>(<a key={i} href={s} className="block underline" target="_blank">{s}</a>))}</div>}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {(data.skills || []).map((s,idx)=>(<span key={idx} className="px-3 py-1 border rounded-full">{s}</span>))}
        </div>
      </Section>

      <Section title="Services">
        <div className="grid md:grid-cols-3 gap-4">
          {data.services.map((s,idx)=>(
            <div key={idx} className="p-4 border rounded-xl">
              <h4 className="font-semibold">{s.title}</h4>
              <p className="text-gray-700 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="grid md:grid-cols-3 gap-4">
          {data.projects.map((p,idx)=>(
            <div key={idx} className="overflow-hidden border rounded-xl">
              {p.image && <img src={p.image} className="w-full h-36 object-cover" />}
              <div className="p-3">
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-gray-700 text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Testimonials">
        <div className="grid md:grid-cols-3 gap-4">
          {data.testimonials.map((t,idx)=>(
            <figure key={idx} className="p-4 border rounded-xl">
              <blockquote className="text-gray-700">“{t.quote}”</blockquote>
              <figcaption className="mt-2 text-sm text-gray-600">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {data.blog?.title && (
        <Section title="Latest Blog">
          <h3 className="text-xl font-semibold">{data.blog.title}</h3>
          <p className="text-gray-700">{data.blog.summary}</p>
        </Section>
      )}

      <Section title="Contact">
        <p className="text-gray-700">{data.contact?.message}</p>
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          <div>📧 {data.contact?.email}</div>
          <div>📞 {data.contact?.phone}</div>
        </div>
      </Section>

      <footer className="text-center text-sm text-gray-500 py-8">© {new Date().getFullYear()} {data.hero?.name} • Template 2</footer>
    </div>
  )
}

function Section({ title, children }){
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div>{children}</div>
    </section>
  )
}
export default TemplateTwo
