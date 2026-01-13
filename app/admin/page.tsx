import { addProject, deleteProject, getProjects, logout, upgradeDB } from "../actions";
import { FiTrash2, FiImage, FiGlobe, FiPlusSquare, FiLogOut, FiTool, FiLayers } from "react-icons/fi";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      <div className="max-w-3xl mx-auto py-12 px-6">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">Manage your projects & portfolio.</p>
          </div>

          <div className="flex gap-3">
            {/* Tombol Fix DB (Hanya muncul jika perlu debug) */}
            <form action={upgradeDB}>
               <button className="flex items-center gap-2 text-xs font-medium text-yellow-600 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 px-3 py-2 rounded-md transition">
                 <FiTool /> Fix DB
               </button>
            </form>
            
            {/* Tombol Logout */}
            <form action={logout}>
              <button className="flex items-center gap-2 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 px-3 py-2 rounded-md transition">
                <FiLogOut /> Logout
              </button>
            </form>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <FiPlusSquare className="text-white"/> Add New Project
          </h2>
          
          <form action={addProject} className="space-y-4">
            {/* Title & Tags */}
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Project Title</label>
                  <input name="title" placeholder="e.g. E-Commerce App" className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-900/20 outline-none transition placeholder:text-gray-700" required />
               </div>
               <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Tech Stack (Tags)</label>
                  <input name="tags" placeholder="e.g. Next.js, Tailwind, Figma" className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-900/20 outline-none transition placeholder:text-gray-700" required />
               </div>
            </div>

            {/* Description */}
            <div>
               <label className="text-xs text-gray-500 mb-1.5 block">Description</label>
               <textarea name="description" placeholder="Brief description of the project..." rows={3} className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-900/20 outline-none transition placeholder:text-gray-700 resize-none" required />
            </div>
            
            {/* Media Settings Group */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-4">
                {/* Link */}
                <div>
                    <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><FiGlobe size={12}/> Project Link</label>
                    <input name="link" placeholder="https://..." className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white focus:border-blue-500/50 outline-none transition placeholder:text-gray-700" required />
                </div>

                {/* Image URL */}
                <div>
                    <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><FiImage size={12}/> Custom Image URL (Optional)</label>
                    <input name="imageUrl" placeholder="Leave empty to auto-screenshot" className="w-full bg-black border border-white/10 p-3 rounded-lg text-sm text-white focus:border-blue-500/50 outline-none transition placeholder:text-gray-700" />
                    <p className="text-[10px] text-gray-600 mt-2">
                       * Jika kosong, sistem akan mengambil screenshot otomatis dari link di atas.
                    </p>
                </div>
            </div>

            <button className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-lg text-sm font-bold transition duration-200">
                Save Project
            </button>
          </form>
        </div>

        {/* --- PROJECT LIST SECTION --- */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <FiLayers className="text-white"/> Existing Projects ({projects.length})
          </h2>

          <div className="space-y-3">
            {projects.length === 0 ? (
               <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                  <p className="text-gray-500 text-sm">No projects found. Add one above.</p>
               </div>
            ) : (
               projects.map((p: any) => (
                <div key={p.id} className="group flex items-center justify-between p-3 bg-[#0A0A0A] border border-white/10 rounded-lg hover:border-white/20 transition-all">
                  <div className="flex gap-4 items-center overflow-hidden">
                    {/* Thumbnail Kecil */}
                    <div className="w-12 h-12 bg-black rounded-md overflow-hidden border border-white/10 flex-shrink-0 relative">
                        {p.imageUrl ? (
                            <img src={p.imageUrl} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                            <img src={`https://s0.wp.com/mshots/v1/https://${p.link.replace(/^https?:\/\//, '')}?w=400`} alt="preview" className="w-full h-full object-cover opacity-70 grayscale" />
                        )}
                    </div>
                    
                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm text-white truncate pr-4">{p.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                         <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 border border-white/5">
                            {p.tags.split(',')[0]}...
                         </span>
                         <span className="text-[10px] text-gray-600 truncate max-w-[150px]">
                            {p.link.replace(/^https?:\/\//, '')}
                         </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <form action={deleteProject.bind(null, p.id)} className="pl-2">
                    <button className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-md transition duration-200" title="Delete Project">
                        <FiTrash2 size={16} />
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}