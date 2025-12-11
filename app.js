const API_URL = "https://uid-worker.bottuser7.workers.dev/uids";

function daysLeft(timestamp) {
    if (!timestamp) return "∞";
    const diff = timestamp - Date.now();
    return diff <= 0 ? "Expirado" : Math.ceil(diff / (1000 * 60 * 60 * 24));
}

async function loadUIDs() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("uidList");
    list.innerHTML = "";

    data.forEach(item => {
        const exp = item.expires_at
            ? new Date(item.expires_at).toLocaleString()
            : "Sin expiración";

        const left = daysLeft(item.expires_at);

        list.innerHTML += `
            <tr>
                <td>${item.uid}</td>
                <td>${exp}</td>
                <td>${left}</td>
                <td>
                    <button class="btn delete" onclick="deleteUID('${item.uid}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function addUID() {
    const uid = document.getElementById("newUID").value.trim();
    const days = parseInt(document.getElementById("days").value.trim());

    if (!uid) return alert("Escribe un UID");
    if (!days) return alert("Días inválidos");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: uid,
            value: "1",
            days: days
        })
    });

    document.getElementById("newUID").value = "";
    document.getElementById("days").value = "";

    loadUIDs();
}

async function deleteUID(uid) {
    await fetch(`${API_URL}/${uid}`, { method: "DELETE" });
    loadUIDs();
}

loadUIDs();
