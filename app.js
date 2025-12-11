const API_URL = "https://uid-worker.bottuser7.workers.dev/uids";

async function loadUIDs() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("uidList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
            <tr>
                <td>${item.uid}</td>
                <td>
                    <button class="action-btn" onclick="deleteUID('${item.uid}')">Eliminar</button>
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
        body: JSON.stringify({ uid: uid, value: "1" })
    });

    document.getElementById("newUID").value = "";
    loadUIDs();
}

async function deleteUID(uid) {
    await fetch(`${API_URL}/${uid}`, {
        method: "DELETE"
    });

    loadUIDs();
}

loadUIDs();
