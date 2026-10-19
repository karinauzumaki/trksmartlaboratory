// Data Laboratorium Dipisah (Lab 1 dan Lab 2)
const defaultLabs = [
    { id: 1, name: "Laboratorium 1", code: "LAB-01", capacity: 35, desc: "Laboratorium utama untuk perangkat komputer, laptop, dan fasilitas utama.", icon: "fa-desktop" },
    { id: 2, name: "Laboratorium 2", code: "LAB-02", capacity: 30, desc: "Laboratorium pendukung praktikum dan inventaris ruang kelas.", icon: "fa-chalkboard-user" }
];

// Data Alat Sesuai Gambar yang Dipisah ke Lab 1 dan Lab 2
const defaultTools = [
    // --- ALAT UNTUK LABORATORIUM 1 ---
    { id: 1, name: "Meja ", category: "Furniture", stock: 21, lab: "Laboratorium 1" },
    { id: 2, name: "PC", category: "Komputer", stock: 21, lab: "Laboratorium 1" },
    { id: 3, name: "Proyektor", category: "Multimedia", stock: 4, lab: "Laboratorium 1" },
    { id: 4, name: "Mouse ", category: "Aksesoris", stock: 21, lab: "Laboratorium 1" },
    { id: 5, name: "Ac1", category: "Pendingin Ruangan", stock: 2, lab: "Laboratorium 1" },
    { id: 6, name: "Kipas angin satu", category: "Pendingin Ruangan", stock: 1, lab: "Laboratorium 1" },
    { id: 7, name: "Papan tulis ", category: "Fasilitas", stock: 1, lab: "Laboratorium 1" },

    // --- ALAT UNTUK LABORATORIUM 2 ---
    { id: 8, name: "PC ", category: "Komputer", stock: 19, lab: "Laboratorium 2" },
    { id: 9, name: "Meja ", category: "Furniture", stock: 19, lab: "Laboratorium 2" },
    { id: 10, name: "Kursi ", category: "Furniture", stock: 19, lab: "Laboratorium 2" },
    { id: 11, name: "AC ", category: "Pendingin Ruangan", stock: 1, lab: "Laboratorium 2" },
    { id: 12, name: "Kipas ", category: "Pendingin Ruangan", stock: 1, lab: "Laboratorium 2" },
    { id: 13, name: "Proyektor", category: "Multimedia", stock: 1, lab: "Laboratorium 2" }
];

const defaultBorrows = [
    { id: "TRK-9011", date: "2026-10-14", name: "Karina", nim: "202305001", tool: "Lep1", qty: 1, returnDate: "2026-10-18", reason: "Tugas Praktikum", status: "Dipinjam" }
];

// Inisialisasi LocalStorage
if (!localStorage.getItem('trk_labs')) localStorage.setItem('trk_labs', JSON.stringify(defaultLabs));
if (!localStorage.getItem('trk_tools')) localStorage.setItem('trk_tools', JSON.stringify(defaultTools));
if (!localStorage.getItem('trk_borrows')) localStorage.setItem('trk_borrows', JSON.stringify(defaultBorrows));

// Navigasi Tab
function switchTab(tabId) {
    document.querySelectorAll('.page-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if(!btn.classList.contains('bg-amber-600')) {
            btn.classList.remove('bg-blue-800');
        }
    });

    renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function resetDataToDefault() {
    if(confirm("Reset seluruh data ke pengaturan awal?")) {
        localStorage.setItem('trk_labs', JSON.stringify(defaultLabs));
        localStorage.setItem('trk_tools', JSON.stringify(defaultTools));
        localStorage.setItem('trk_borrows', JSON.stringify(defaultBorrows));
        renderAll();
        alert("Data berhasil direset!");
    }
}

// Render Semua
function renderAll() {
    renderHomeStats();
    renderLabs();
    renderTools();
    renderBorrowDropdown();
    renderHistory();
    renderAdminDashboard();
}

function renderHomeStats() {
    const labs = JSON.parse(localStorage.getItem('trk_labs'));
    const tools = JSON.parse(localStorage.getItem('trk_tools'));
    const borrows = JSON.parse(localStorage.getItem('trk_borrows'));

    document.getElementById('stat-labs').innerText = labs.length;
    document.getElementById('stat-tools').innerText = tools.length;
    const activeCount = borrows.filter(b => b.status === 'Dipinjam').length;
    document.getElementById('stat-active').innerText = activeCount;
}

function renderLabs() {
    const labs = JSON.parse(localStorage.getItem('trk_labs'));
    const container = document.getElementById('labs-container');
    container.innerHTML = labs.map(lab => `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-3">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                <i class="fa-solid ${lab.icon}"></i>
            </div>
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-lg text-gray-900">${lab.name}</h3>
                <span class="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-mono">${lab.code}</span>
            </div>
            <p class="text-gray-600 text-sm">${lab.desc}</p>
            <div class="pt-2 border-t text-xs text-gray-500 flex justify-between">
                <span>Kapasitas: ${lab.capacity} Orang</span>
                <span class="text-emerald-600 font-semibold"><i class="fa-solid fa-circle text-[8px] mr-1"></i> Aktif</span>
            </div>
        </div>
    `).join('');
}

function renderTools() {
    const tools = JSON.parse(localStorage.getItem('trk_tools'));
    const tbody = document.getElementById('tools-table-body');
    tbody.innerHTML = tools.map((tool, idx) => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${idx + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${tool.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span class="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">${tool.category}</span></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${tool.stock} Unit</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tool.lab}</td>
        </tr>
    `).join('');
}

function filterTools() {
    const keyword = document.getElementById('search-tools').value.toLowerCase();
    const tools = JSON.parse(localStorage.getItem('trk_tools'));
    const filtered = tools.filter(t => t.name.toLowerCase().includes(keyword) || t.category.toLowerCase().includes(keyword) || t.lab.toLowerCase().includes(keyword));
    const tbody = document.getElementById('tools-table-body');
    tbody.innerHTML = filtered.map((tool, idx) => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${idx + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${tool.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span class="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">${tool.category}</span></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${tool.stock} Unit</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tool.lab}</td>
        </tr>
    `).join('');
}

function renderBorrowDropdown() {
    const tools = JSON.parse(localStorage.getItem('trk_tools'));
    const select = document.getElementById('borrow-tool');
    select.innerHTML = '<option value="">-- Pilih Alat --</option>' + 
        tools.map(t => `<option value="${t.name}">${t.name} (${t.lab}) - Stok: ${t.stock}</option>`).join('');
}

function handleBorrowSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('borrower-name').value;
    const nim = document.getElementById('borrower-nim').value;
    const tool = document.getElementById('borrow-tool').value;
    const qty = parseInt(document.getElementById('borrow-qty').value);
    const returnDate = document.getElementById('borrow-date').value;
    const reason = document.getElementById('borrow-reason').value;

    let tools = JSON.parse(localStorage.getItem('trk_tools'));
    let selectedTool = tools.find(t => t.name === tool);
    if(selectedTool && selectedTool.stock < qty) {
        alert(`Maaf, stok alat tidak mencukupi! Stok tersedia: ${selectedTool.stock}`);
        return;
    }

    const newBorrow = {
        id: "TRK-" + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        name, nim, tool, qty, returnDate, reason,
        status: "Menunggu Konfirmasi"
    };

    let borrows = JSON.parse(localStorage.getItem('trk_borrows'));
    borrows.unshift(newBorrow);
    localStorage.setItem('trk_borrows', JSON.stringify(borrows));

    document.getElementById('borrow-form').reset();
    alert("Peminjaman berhasil diajukan! Menunggu konfirmasi Admin.");
    switchTab('history');
}

function renderHistory() {
    const borrows = JSON.parse(localStorage.getItem('trk_borrows'));
    const tbody = document.getElementById('history-table-body');
    
    if(borrows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">Belum ada riwayat peminjaman.</td></tr>`;
        return;
    }

    tbody.innerHTML = borrows.map(b => {
        let badgeColor = "bg-amber-100 text-amber-800";
        if(b.status === "Dipinjam") badgeColor = "bg-blue-100 text-blue-800";
        if(b.status === "Dikembalikan") badgeColor = "bg-emerald-100 text-emerald-800";
        if(b.status === "Ditolak") badgeColor = "bg-rose-100 text-rose-800";

        return `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="font-bold text-gray-900">${b.id}</span>
                    <div class="text-xs text-gray-500">${b.date}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="font-medium text-gray-900">${b.name}</div>
                    <div class="text-xs text-gray-500">NIM: ${b.nim}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="font-medium text-gray-900">${b.tool}</div>
                    <div class="text-xs text-gray-500">Jumlah: ${b.qty} Unit</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${b.returnDate}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${badgeColor}">${b.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    ${b.status === 'Dipinjam' ? `<button onclick="returnTool('${b.id}')" class="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-700 shadow transition">Kembalikan</button>` : `<span class="text-xs text-gray-400 italic">${b.reason}</span>`}
                </td>
            </tr>
        `;
    }).join('');
}

function renderAdminDashboard() {
    const borrows = JSON.parse(localStorage.getItem('trk_borrows'));
    
    document.getElementById('admin-pending-count').innerText = borrows.filter(b => b.status === 'Menunggu Konfirmasi').length;
    document.getElementById('admin-borrowed-count').innerText = borrows.filter(b => b.status === 'Dipinjam').length;
    document.getElementById('admin-returned-count').innerText = borrows.filter(b => b.status === 'Dikembalikan').length;
    document.getElementById('admin-rejected-count').innerText = borrows.filter(b => b.status === 'Ditolak').length;

    const tbody = document.getElementById('admin-table-body');
    if(borrows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">Tidak ada permohonan.</td></tr>`;
        return;
    }

    tbody.innerHTML = borrows.map(b => {
        let badgeColor = "bg-amber-100 text-amber-800";
        if(b.status === "Dipinjam") badgeColor = "bg-blue-100 text-blue-800";
        if(b.status === "Dikembalikan") badgeColor = "bg-emerald-100 text-emerald-800";
        if(b.status === "Ditolak") badgeColor = "bg-rose-100 text-rose-800";

        let actionButtons = '';
        if(b.status === "Menunggu Konfirmasi") {
            actionButtons = `
                <div class="flex justify-center space-x-2">
                    <button onclick="adminAction('${b.id}', 'approve')" class="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition">Setujui</button>
                    <button onclick="adminAction('${b.id}', 'reject')" class="bg-rose-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-rose-700 transition">Tolak</button>
                </div>
            `;
        } else if(b.status === "Dipinjam") {
            actionButtons = `<button onclick="adminAction('${b.id}', 'return')" class="bg-emerald-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-emerald-700 transition">Konfirmasi Kembali</button>`;
        } else {
            actionButtons = `<span class="text-xs text-gray-400 italic">Selesai</span>`;
        }

        return `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${b.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="font-medium text-gray-900">${b.name}</div>
                    <div class="text-xs text-gray-500">NIM: ${b.nim}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="font-medium text-gray-900">${b.tool}</div>
                    <div class="text-xs text-gray-500">Qty: ${b.qty} Unit</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">${b.reason}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${badgeColor}">${b.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                    ${actionButtons}
                </td>
            </tr>
        `;
    }).join('');
}

function adminAction(id, action) {
    let borrows = JSON.parse(localStorage.getItem('trk_borrows'));
    let tools = JSON.parse(localStorage.getItem('trk_tools'));
    let index = borrows.findIndex(b => b.id === id);
    if(index === -1) return;

    let targetTool = tools.find(t => t.name === borrows[index].tool);

    if(action === 'approve') {
        if(targetTool && targetTool.stock < borrows[index].qty) {
            alert("Stok alat tidak mencukupi!");
            return;
        }
        if(targetTool) targetTool.stock -= borrows[index].qty;
        borrows[index].status = "Dipinjam";
        alert(`Peminjaman ${id} disetujui.`);
    } else if(action === 'reject') {
        borrows[index].status = "Ditolak";
        alert(`Peminjaman ${id} ditolak.`);
    } else if(action === 'return') {
        if(targetTool) targetTool.stock += borrows[index].qty;
        borrows[index].status = "Dikembalikan";
        alert(`Alat peminjaman ${id} telah dikembalikan.`);
    }

    localStorage.setItem('trk_borrows', JSON.stringify(borrows));
    localStorage.setItem('trk_tools', JSON.stringify(tools));
    renderAll();
}

function returnTool(id) {
    adminAction(id, 'return');
}

window.onload = renderAll;