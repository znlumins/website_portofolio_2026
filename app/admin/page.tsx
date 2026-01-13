import { addProject, deleteProject, getProjects, logout, upgradeDB } from "../actions";
import { Trash2, Image as ImageIcon, Globe, LayoutTemplate } from "lucide-react";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Admin Dashboard
          </h1>
          <div className="flex gap-2">
            <form action={upgradeDB}>
               <button className="text-xs text-yellow-500 border border-yellow-900/50 hover:bg-yellow-900/20 px-3 py-2 rounded-lg transition">
                 Fix DB
               </button>
            </form>
            <form action={logout}>
              <button className="text-sm text-red-400 border border-red-900/50 hover:bg-red-900/20 px-4 py-2 rounded-lg transition">
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <LayoutTemplate size={20} className="text-blue-400"/> Add New Project
          </h2>
          
          <form action={addProject} className="grid gap-5">
            <div className="grid md:grid-cols-2 gap-4">
               <input name="title" placeholder="Project Title" className="bg-black/40 border border-white/10 p-3 rounded-lg text-white focus:border-blue-500 outline-none transition" required />
               <input name="tags" placeholder="Tags (e.g. Next.js, Figma)" className="bg-black/40 border border-white/10 p-3 rounded-lg text-white focus:border-blue-500 outline-none transition" required />
            </div>

            <textarea name="description" placeholder="Description..." rows={3} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white focus:border-blue-500 outline-none transition" required />
            
            <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl space-y-4">
                <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-2">Preview Settings (Pilih Salah Satu)</p>
                
                {/* Opsi 1: Link Web */}
                <div className="relative">
                    <Globe className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input name="link" placeholder="Link Project (Contoh: google.com)" className="w-full bg-black/40 border border-white/10 p-3 pl-10 rounded-lg text-white focus:border-blue-500 outline-none" required />
                </div>

                {/* Opsi 2: Custom Image */}
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <input name="imageUrl" placeholder="(Opsional) Paste Link Gambar disini untuk Design/Figma" className="w-full bg-black/40 border border-white/10 p-3 pl-10 rounded-lg text-white focus:border-blue-500 outline-none" />
                </div>
                {/* PERBAIKAN DI SINI: Menghapus tanda panah yang bikin error */}
                <div className="text-[10px] text-gray-400 ml-1 leading-relaxed">
                    <p>* Kosongkan "Image URL" jika ingin screenshot otomatis dari Link Project.</p>
                    <p>* Isi "Image URL" jika ini project Design (Upload ke Imgur/Discord, Copy Link, lalu Paste sini).</p>
                </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition shadow-lg shadow-blue-900/20 mt-2">
                Save Project
            </button>
          </form>
        </div>

        {/* List Preview */}
        <div className="space-y-3">
          {projects.map((p: any) => (
            <div key={p.id} className="flex gap-4 items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
              <div className="flex gap-4 items-center">
                {/* Logic Preview Thumbnail di Admin */}
                <div className="w-16 h-12 bg-black rounded overflow-hidden border border-white/10 flex-shrink-0">
                    {p.imageUrl ? (
                        <img src={p.imageUrl} className="w-full h-full object-cover" />
                    ) : (
                        <img src={`https://s0.wp.com/mshots/v1/https://${p.link.replace(/^https?:\/\//, '')}?w=400`} className="w-full h-full object-cover opacity-80" />
                    )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{p.title}</h3>
                  <span className="text-xs text-gray-500 flex gap-2 items-center mt-1">
                    {p.imageUrl ? "🖼️ Custom Image" : "📸 Auto Screenshot"}
                  </span>
                </div>
              </div>
              <form action={deleteProject.bind(null, p.id)}>
                <button className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition"><Trash2 size={18} /></button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}