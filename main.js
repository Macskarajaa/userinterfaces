const users = [
    { id: 1, name: "Kiss Éva", age: 28, email: "eva@example.com", avatar: "https://i.pravatar.cc/250?img=1" },
    { id: 2, name: "Nagy Anna", age: 34, email: "anna@example.com", avatar: "https://i.pravatar.cc/250?img=2" },
    { id: 3, name: "Szabó Gábor", age: 41, email: "gabor@example.com", avatar: "https://i.pravatar.cc/250?img=3" },
    { id: 4, name: "Tóth Péter", age: 25, email: "peter@example.com", avatar: "https://i.pravatar.cc/250?img=4" },
    { id: 5, name: "Varga László", age: 39, email: "laszlo@example.com", avatar: "https://i.pravatar.cc/250?img=6" },
    { id: 6, name: "Molnár Júlia", age: 31, email: "julia@example.com", avatar: "https://i.pravatar.cc/250?img=5" },
    { id: 7, name: "Balogh István", age: 45, email: "istvan@example.com", avatar: "https://i.pravatar.cc/250?img=7" },
    { id: 8, name: "Kovács Zsolt", age: 29, email: "zsolt@example.com", avatar: "https://i.pravatar.cc/250?img=8" },
    { id: 9, name: "Horváth Bea", age: 36, email: "bea@example.com", avatar: "https://i.pravatar.cc/250?img=9" }
];

let currentUserId = null;

function renderProfiles(arr) {
    const container = document.querySelector('.profiles-container');
    container.innerHTML = "";
    arr.forEach(({ id, name, age, email, avatar }) => {
        container.innerHTML += `
        <div class="card">
            <img src="${avatar}" alt="${name}">
            <h2>${name}</h2>
            <p>Age: ${age}</p>
            <p>Email: ${email}</p>
            <button onclick="displayPopover(${id}, '${name}', ${age}, '${email}', '${avatar}')">Edit</button>
        </div>
        `;
    });
}

function displayPopover(id, name, age, email, avatar) {
    currentUserId = id;
    const popover = document.getElementById('popover');
    document.getElementById('popover-avatar').src = avatar;
    document.getElementById('popover-name').value = name;
    document.getElementById('popover-age').value = age;
    document.getElementById('popover-email').value = email;
    popover.style.display = 'block';
}

function closePopover() {
    document.getElementById('popover').style.display = 'none';
}

function changeAvatar() {
    const newAvatar = prompt("Enter new avatar URL:");
    if (newAvatar) {
        document.getElementById('popover-avatar').src = newAvatar;
    }
}

function deleteProfile() {
    users = users.filter(user => user.id !== currentUserId);
    renderProfiles(users);
    closePopover();
}

function saveChanges() {
    const name = document.getElementById('popover-name').value;
    const age = document.getElementById('popover-age').value;
    const email = document.getElementById('popover-email').value;
    const avatar = document.getElementById('popover-avatar').src;

    users = users.map(user => {
        if (user.id === currentUserId) {
            return { ...user, name, age, email, avatar };
        }
        return user;
    });

    renderProfiles(users);
    closePopover();
}

document.addEventListener('DOMContentLoaded', () => {
    renderProfiles(users);
});