const API_URL = "https://uid-worker.bottuser7.workers.dev/uids";

async function loadUIDs() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("uidList");
    list.innerHTML = "";

    const users = data.users || {};

    Object.entries(users).forEach(([uid, info]) => {
        const exp = info.expiresAt
            ? new Date(info.expiresAt).toLocaleString()
            : "Sin expiración";

        let left;
        if (info.daysRemaining === null) {
            left = "∞";
        } else if (info.daysRemaining <= 0) {
            left = "Expirado";
        } else {
            left = info.daysRemaining;
        }

        list.innerHTML += `
            <tr>
                <td>${uid}</td>
                <td>${exp}</td>
                <td>${left}</td>
                <td>
                    <button class="btn delete" onclick="deleteUID('${uid}')">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

async function addUID() {
    const uid = document.getElementById("newUID").value.trim();
    const days = parseInt(document.getElementById("days").value.trim(), 10);

    if (!uid) return alert("Escribe un UID");
    if (!days || days <= 0) return alert("Días inválidos");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid,
            value: "1",
            days
        })
    });

    document.getElementById("newUID").value = "";
    document.getElementById("days").value = "";

    loadUIDs();
}

async function deleteUID(uid) {
    if (!confirm(`¿Eliminar UID ${uid}?`)) return;

    await fetch(`${API_URL}/${uid}`, { method: "DELETE" });
    loadUIDs();
}

// inicial
loadUIDs();
