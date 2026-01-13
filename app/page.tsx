import { getProjects, initializeDatabase } from "./actions";
import { 
  ArrowUpRight, Github, Linkedin, Mail, 
  Scissors // Import Scissors dari Lucide khusus buat pengganti icon CapCut
} from "lucide-react";

import Marquee from "react-fast-marquee";

// IMPORT ICON LOGO ASLI (Simple Icons)
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiGit, SiVercel, 
  SiFigma, SiAdobephotoshop, SiAdobepremierepro, SiBlender, 
  SiCoreldraw 
} from "react-icons/si";

export default async function Home() {
  await initializeDatabase();
  const projects = await getProjects();

  const getPreviewImage = (project: any) => {
    if (project.imageUrl && project.imageUrl.trim() !== "") {
      return project.imageUrl;
    }
    let cleanLink = project.link.replace(/^https?:\/\//, '');
    const fullLink = `https://${cleanLink}`;
    return `https://s0.wp.com/mshots/v1/${fullLink}?w=1200`;
  };

  // --- DATA TECH STACK ---
  const techStack = [
    // --- Coding ---
    { name: "Next.js", icon: <SiNextdotjs size={18} /> },
    { name: "React", icon: <SiReact size={18} /> },
    { name: "TypeScript", icon: <SiTypescript size={18} /> },
    { name: "Tailwind", icon: <SiTailwindcss size={18} /> },
    { name: "Node.js", icon: <SiNodedotjs size={18} /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
    { name: "Git", icon: <SiGit size={18} /> },
    { name: "Vercel", icon: <SiVercel size={18} /> },
    
    // --- Design & Editing ---
    { name: "Figma", icon: <SiFigma size={18} /> },
    { name: "Photoshop", icon: <SiAdobephotoshop size={18} /> },
    { name: "Premiere", icon: <SiAdobepremierepro size={18} /> },
    { name: "Blender", icon: <SiBlender size={18} /> },
    { name: "CorelDraw", icon: <SiCoreldraw size={18} /> },
    
    // Khusus CapCut pakai icon Scissors dari Lucide
    { name: "CapCut", icon: <Scissors size={18} /> }, 
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
          <span className="font-bold text-xl tracking-tighter hover:text-blue-400 transition cursor-pointer">znlumins.</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-10">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-24 mt-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* KOLOM KIRI */}
            <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                Fullstack Developer
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
                Crafting digital <br/> experiences.
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                Hello, I'm <strong>znlumins</strong> aka. <strong>Daffa Ahmad Al Attas</strong>. An IT enthusiast with a passion for website development and creating innovative digital solutions.
              </p>
              <div className="flex gap-4 items-center justify-center md:justify-start">
                <a href="#projects" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  View Work
                </a>
                
                {/* ICON LINK JUMBOTRON (Updated) */}
                <div className="flex gap-4 px-4 border-l border-white/10 ml-2">
                  <a href="https://github.com/znlumins" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition" />
                  </a>
                  <a href="https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition" />
                  </a>
                  <a href="mailto:daffaahmadalsch@student.ub.ac.id">
                    <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition" />
                  </a>
                </div>

              </div>
            </div>

            {/* KOLOM KANAN */}
            <div className="order-1 md:order-2 hidden md:flex justify-end">
              <img 
                src="/daffa.png" 
                alt="Daffa Ahmad Al Attas" 
                className="w-72 md:w-[500px] h-auto object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* --- TECH STACK CAROUSEL --- */}
        <section className="mb-32">
           <div className="text-center mb-10">
             <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Technologies & Tools</p>
           </div>
           
           <Marquee 
             autoFill 
             pauseOnHover 
             gradient 
             gradientColor="#050505" 
             speed={50}
             className="overflow-hidden py-4"
           >
             {techStack.map((tech, i) => (
               <div key={i} className="flex items-center gap-3 px-6 py-4 mx-4 bg-[#0A0A0A] border border-white/5 rounded-xl text-gray-300 min-w-[150px] justify-center hover:border-blue-500/30 hover:text-blue-400 transition cursor-default">
                 <span className="text-xl">{tech.icon}</span>
                 <span className="font-medium">{tech.name}</span>
               </div>
             ))}
           </Marquee>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="mb-32">
          <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Selected Projects <span className="text-sm font-normal text-gray-500">({projects.length})</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.length === 0 ? (
               <div className="col-span-2 py-16 text-center text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                 <p>Belum ada project.</p>
               </div>
            ) : (
              projects.map((project: any) => (
                <div key={project.id} className="group relative rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <div className="h-56 overflow-hidden relative border-b border-white/5 bg-gray-900">
                    <img 
                      src={getPreviewImage(project)}
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <a href={`https://${project.link.replace(/^https?:\/\//, '')}`} target="_blank" className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition border border-white/10 z-10">
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {project.tags.split(',').map((tag: string, i: number) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-gray-400 border border-white/5">
                            {tag.trim()}
                          </span>
                       ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- CONTACT / FOOTER --- */}
        <section id="contact" className="py-20 border-t border-white/5 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-6">
             Interested in working together?
           </h2>
           <p className="text-gray-400 mb-8 max-w-lg mx-auto">
             I'm always open to discussing product design work or partnership opportunities.
           </p>
           
           <a href="mailto:daffaahmadalsch@student.ub.ac.id" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition duration-300 mb-16">
             <Mail size={18} />
             <span>Send me an email</span>
           </a>

           <footer className="text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
              <p>&copy; {new Date().getFullYear()} znlumins. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                 <a href="https://x.com/zen_luminscent" className="hover:text-white transition">Twitter</a>
                 <a href="https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/" className="hover:text-white transition">LinkedIn</a>
                 <a href="https://github.com/znlumins" className="hover:text-white transition">GitHub</a>
              </div>
           </footer>
        </section>

      </div>
    </main>
  );
}