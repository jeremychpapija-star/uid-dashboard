const API_URL = "https://uid-worker.bottuser7.workers.dev/";

async function loadUIDs() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("uidList");
    list.innerHTML = "";

    data.uids.forEach(uid => {
        list.innerHTML += `
            <tr>
                <td>${uid}</td>
                <td>
                    <button class="action-btn" onclick="deleteUID('${uid}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function addUID() {
    const uid = document.getElementById("newUID").value.trim();
    if (!uid) return alert("Escribe un UID");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
    });

    document.getElementById("newUID").value = "";
    loadUIDs();
}

async function deleteUID(uid) {
    await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
    });

    loadUIDs();
}

loadUIDs();
